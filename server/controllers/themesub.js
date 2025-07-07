const ThemeSub = require("../models/themesub");
const Themes = require("../models/themes");
const Song = require("../models/song");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

const createThemeSub = asyncHandler(async (req, res) => {
  if (Object.keys(req.body).length === 0) throw new Error("Missing inputs");
  if (req.body && req.body.title)
    req.body.slug = slugify(req.body.title, { lower: true });
  const { slug } = req.body;
  const themesub = await ThemeSub.findOne({ slug });
  if (themesub) {
    const tempThemeSub1 = await ThemeSub.find({ slug: { $regex: slug } });
    const existSlug = tempThemeSub1?.map((item) => item.slug);
    const existSlugLength = existSlug?.length;
    if (existSlugLength > 0) {
      req.body.slug = `${slug}(${existSlugLength})`;
    } else {
      req.body.slug = `${slug}(1)`;
    }
  } else {
    req.body.slug = slug;
  }
  const newThemeSub = await ThemeSub.create(req.body);
  if (newThemeSub) {
    res.status(200).json({
      success: true,
      data: newThemeSub ? newThemeSub : "Failed to create themesub",
      msg: newThemeSub
        ? "Successfully created themesub"
        : "Failed to create themesub",
    });
  }
});
const updateThemeSub = asyncHandler(async (req, res) => {
  const { tid } = req.params;
  const currentTheme = await ThemeSub.findById(tid);

  if (!currentTheme) throw new Error("ThemeSub not found");

  if (req.body && req.body.title) {
    req.body.slug = slugify(req.body.title, { lower: true });
  }
  const { slug } = req.body;
  const themesubSlug = await ThemeSub.findOne({ slug });

  if (themesubSlug) {
    const tempThemeSub = await ThemeSub.find({ slug: { $regex: slug } });

    if (tempThemeSub.length >= 1) {
      const tempSlug = tempThemeSub.find(
        (themesub) => themesub._id.toString() === tid.toString()
      )?.slug;
      if (tempSlug) {
        req.body.slug = tempSlug;
      } else {
        const existSlug = tempThemeSub?.map((themesub) => themesub.slug);
        const existNumberHighest = existSlug
          ?.map((slug) => slug.replace(/[^0-9]/g, ""))
          .sort((a, b) => b - a)[0];
        if (existNumberHighest) {
          const replaceNumber = Number(existNumberHighest) + 1;
          req.body.slug = `${slug}(${replaceNumber}})`;
        } else {
          req.body.slug = `${slug}(1)`;
        }
      }

      // req.body.slug = slug;
    }

    // const existSlug = tempThemeSub?.map((el) => el.slug);
    // const existNumberHighest = existSlug
    //   ?.map((slug) => slug.replace(/[^0-9]/g, ""))
    //   .sort((a, b) => b - a)[0];
    // if (existNumberHighest) {
    //   const replaceNumber = Number(existNumberHighest) + 1;
    //   req.body.slug = slug + "(" + replaceNumber + ")";
    // } else {
    //   req.body.slug = slug + "(" + 1 + ")";
    // }
  } else {
    req.body.slug = slug;
  }

  const newThemeSub = await ThemeSub.findByIdAndUpdate(tid, req.body, {
    new: true,
  });
  await newThemeSub.save();
  //generate waveform image from audio file

  return res.status(200).json({
    success: newThemeSub ? true : false,
    data: newThemeSub ? newThemeSub : "Theme updated failed",
    msg: newThemeSub ? "Theme updated successfully" : "Theme updated failed",
  });
});
const getThemeSub = asyncHandler(async (req, res) => {
  // get id from request query params
  const { tid } = req.params;
  const pageSong = parseInt(req.query.pageSong) || 1;
  const limitSong = parseInt(req.query.limitSong) || 0;
  const skipSong = (pageSong - 1) * limitSong;
  let fieldsSong = "";
  if (req.query.fieldsSong) {
    fieldsSong = req.query.fieldsSong.split(",").join(" ");
  } else {
    fieldsSong = "-__v -instruments -videothemes -album -genres"
  }
  const themesub = await ThemeSub.findById(tid)
    .populate("themes", "_id title slug themesArtwork ")
    .populate({
      path: "song",
      //fields
      select: `${fieldsSong}`,
      //filter
      match: { status: true },
      //limit
      perDocumentLimit: limitSong || 0,
      options: {
        skip: skipSong || 0,
        // limit: limitSong,
        // page : pageSong,
      },
      // populate : "artists"
      populate: [
        "artists",
        "moods",
        "license",
      ],
    });
  // console.log(song.slug.slice(-2,-1))
  const counts = await ThemeSub.findById(tid).populate("song");
  if (
    !themesub ||
    themesub === null ||
    themesub === undefined ||
    themesub === "" ||
    themesub?.length === 0
  ) {
    throw new Error("ThemeSub not found");
  } else {
  return res.status(200).json({
    songCount: counts.song?.length,
    songSkip: skipSong,
    songLimit : limitSong,
    success: themesub ? true : false,
    data: themesub ? themesub : "ThemeSub not found",
    msg: themesub ? "ThemeSub found successfully" : "ThemeSub not found",
  });
}
});
const getThemeSubBySlug = asyncHandler(async (req, res) => {
  // get id from request query params
  const { slug } = req.params;
  const pageSong = parseInt(req.query.pageSong) || 1;
  const limitSong = parseInt(req.query.limitSong) || 0;
  const skipSong = (pageSong - 1) * limitSong;
  let fieldsSong = "";
  if (req.query.fieldsSong) {
    fieldsSong = req.query.fieldsSong.split(",").join(" ");
  } else {
    fieldsSong = "-__v -instruments -videothemes -album -genres"
  }
  const themesub = await ThemeSub.findOne({ slug }).populate(
    "themes",
    "_id title slug themesArtwork "
  ).populate({
    path: "song",
    //fields
    select: `${fieldsSong}`,
    //filter
    match: { status: true },
    //limit
    perDocumentLimit: limitSong || 0,
    options: {
      skip: skipSong || 0,
      // limit: limitSong,
      // page : pageSong,
    },
    // populate : "artists"
    populate: [
      "artists",
      "moods",
      "license",
    ],
  });
  // const song = await Promise.all(
  //   themesub?.song.map(async (el) => {
  //     return await Song.findById(el)
  //       .populate("genres", "name _id slug")
  //       .populate("artists", "name _id slug")
  //       .populate("album", "title _id slug")
  //       .populate("moods", "name _id slug")
  //       .populate("instruments", "name _id slug")
  //       .populate("videothemes", "name _id slug")
  //       .populate("license");
  //   })
  // );
  // themesub.song = song;
  const counts = await ThemeSub.findOne({ slug: slug }).populate("song");

  if (
    !themesub ||
    themesub === null ||
    themesub === undefined ||
    themesub === "" ||
    themesub?.length === 0
  ) {
    throw new Error("ThemeSub not found");
  } else {
    themesub.views = themesub.views + 1;
    await themesub.save();
    return res.status(200).json({
      songCount: counts.song?.length,
      songSkip: skipSong,
      songLimit : limitSong,
      msg: themesub ? "Get ThemeSub successfully" : "Get ThemeSub failed",
      success: themesub ? true : false,
      data: themesub,
    });
  }
});
const getAllThemeSub = asyncHandler(async (req, res) => {
  const queries = { ...req.query };
  const excludedFields = ["sort", "page", "limit", "fields"];
  excludedFields.forEach((el) => delete queries[el]);

  let queryString = JSON.stringify(queries);
  queryString = queryString.replace(
    /\b(gte|gt|lte|lt)\b/g,
    (match) => `$${match}`
  );
  const formatedQueries = JSON.parse(queryString);
  if (queries?.title) {
    delete formatedQueries.title;
    // formatedQueries.$text = { $search: `\`"${queries.title}"\`` };
    // formatedQueries.$text = { $search: `${queries.title}` };
    const themeId = await Themes.find({
      $text: { $search: `${queries.title}` },
    });
    if (themeId && themeId.length > 0) {
      formatedQueries.themes = { $in: themeId.map((el) => el._id) };
    } else if (themeId && themeId.length === 1) {
      formatedQueries.themes = themeId._id;
    } else {
      delete formatedQueries.themes;
    }
  }
  if (queries?.themeSlug) {
    const themeId = await Themes.findOne({ slug: queries.themeSlug });
    delete formatedQueries.themeSlug;
    // formatedQueries.$text = { $search: `\`"${queries.title}"\`` };
    formatedQueries.themes = themeId._id;
  }
  let queryCommand = ThemeSub.find(formatedQueries)
    .populate("themes", "_id title slug themesArtwork ")
    .populate("song");

  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    queryCommand = queryCommand.sort(sortBy);
  } else {
    queryCommand = queryCommand.sort("-createdAt");
  }
  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    queryCommand = queryCommand.select(fields);
  } else {
    queryCommand = queryCommand.select("-__v");
  }
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || "";
  const skip = (page - 1) * limit;
  queryCommand = queryCommand.skip(skip).limit(limit);
  const counts = await ThemeSub.find(formatedQueries).countDocuments();
  if (req.query.page) {
    if (counts === 0)
      return res
        .status(200)
        .json({ msg: "Không có theme", success: true, data: [] });
    if (skip >= counts) throw new Error("This page does not exist");
  }

  queryCommand.exec(async (err, response) => {
    if (err) throw new Error(err.message);
    return res.status(200).json({
      success: response ? true : false,
      counts,
      limit,
      skip,
      data: response ? response : "ThemeSub not found",
      msg: response ? "ThemeSub found successfully" : "ThemeSub not found",
    });
  });
});
const deleteThemeSub = asyncHandler(async (req, res) => {
  const { tid } = req.params;
  const theme = await ThemeSub.findByIdAndRemove(tid);
  return res.status(200).json({
    success: theme ? true : false,
    msg: theme ? "Theme deleted successfully" : "Theme deleted failed",
    dataDeleted: theme,
  });
});
module.exports = {
  createThemeSub,
  updateThemeSub,
  getThemeSub,
  getThemeSubBySlug,
  getAllThemeSub,
  deleteThemeSub,
};
