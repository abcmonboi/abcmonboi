const Themes = require("../models/themes");
const Themesub = require("../models/themesub");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

const createThemes = asyncHandler(async (req, res) => {
  if (Object.keys(req.body).length === 0) throw new Error("Missing inputs");
  if (req.body && req.body.title)
    req.body.slug = slugify(req.body.title, { lower: true });
  const { slug } = req.body;
  const themes = await Themes.findOne({ slug });

  if (themes) {
    const tempThemes1 = await Themes.find({ slug: { $regex: slug } });
    const existSlug = tempThemes1?.map((item) => item.slug);

    const existSlugLength = existSlug?.length;
    if (existSlugLength > 0) {
      req.body.slug = `${slug}(${existSlugLength})`;
    } else {
      req.body.slug = `${slug}(1)`;
    }
  } else {
    req.body.slug = slug;
  }
  const newThemes = await Themes.create(req.body);
  if (newThemes) {
    res.status(200).json({
      success: true,
      data: newThemes ? newThemes : "Failed to create themes",
      msg: newThemes
        ? "Successfully created themes"
        : "Failed to create themes",
    });
  }
});
const updateTheme = asyncHandler(async (req, res) => {
  const { tid } = req.params;
  const currentTheme = await Themes.findById(tid);

  if (!currentTheme) throw new Error("Theme not found");

  if (req.body && req.body.title) {
    req.body.slug = slugify(req.body.title, { lower: true });
  } else throw new Error("Missing inputs");

  const { slug } = req.body;
  const themeSlug = await Themes.findOne({ slug });

  if (themeSlug) {
    const tempThemes = await Themes.find({ slug: { $regex: slug } });

    if (tempThemes.length >= 1) {
      const tempSlug = tempThemes.find(
        (theme) => theme._id.toString() === tid.toString()
      )?.slug;
      if (tempSlug) {
        req.body.slug = tempSlug;
      } else {
        const existSlug = tempThemes?.map((theme) => theme.slug);
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
    // const existSlug = tempThemes?.map((el) => el.slug);
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

  const newThemes = await Themes.findByIdAndUpdate(tid, req.body, {
    new: true,
  });
  await newThemes.save();
  //generate waveform image from audio file

  return res.status(200).json({
    success: newThemes ? true : false,
    data: newThemes ? newThemes : "Theme updated failed",
    msg: newThemes ? "Theme updated successfully" : "Theme updated failed",
  });
});
const getTheme = asyncHandler(async (req, res) => {
  // get id from request query params
  const { tid } = req.params;
  const themes = await Themes.findById(tid);
  const countThemesub = await Themesub.countDocuments({ themes: tid });
  // console.log(song.slug.slice(-2,-1))
  return res.status(200).json({
    success: themes ? true : false,
    data: themes ? themes : "Theme not found",
    msg: themes ? "Theme found successfully" : "Theme not found",
    countThemesub,
  });
});
const getThemeBySlug = asyncHandler(async (req, res) => {
  // get id from request query params
  const { slug } = req.params;
  const themes = await Themes.findOne({ slug });
  if (
    !themes ||
    themes === null ||
    themes === undefined ||
    themes === "" ||
    themes?.length === 0
  ) {
    throw new Error("Theme not found");
  } else {
    themes.views = themes.views + 1;
    await themes.save();
    return res.status(200).json({
      msg: themes ? "Get Theme successfully" : "Get Theme failed",
      success: themes ? true : false,
      data: themes,
    });
  }
});
const getAllThemes = asyncHandler(async (req, res) => {
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
    formatedQueries.$text = { $search: `${queries.title}` };
  }

  let queryCommand = Themes.find(formatedQueries);

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
  const counts = await Themes.find(formatedQueries).countDocuments();
  if (req.query.page) {
    if (counts === 0)
      return res
        .status(200)
        .json({ msg: "Không có theme", success: true, data: [] });
    if (skip >= counts) throw new Error("This page does not exist");
  }

  queryCommand.exec(async (err, response) => {
    //find each themesub of each theme
    const countThemesub = await Promise.all(
      response.map(async (el) => {
        return await Themesub.countDocuments({ themes: el._id });
      })
    );

    response = response.map((el, index) => {
      return {
        ...el._doc,
        countThemesub: countThemesub[index],
      };
    });
    // console.log(countThemesub)

    if (err) throw new Error(err.message);
    return res.status(200).json({
      success: response ? true : false,
      counts,
      limit,
      skip,
      data: response ? response : "Themes not found",
      msg: response ? "Themes found successfully" : "Themes not found",
    });
  });
});
const deleteTheme = asyncHandler(async (req, res) => {
  const { tid } = req.params;
  const theme = await Themes.findByIdAndRemove(tid);
  return res.status(200).json({
    success: theme ? true : false,
    msg: theme ? "Theme deleted successfully" : "Theme deleted failed",
    dataDeleted: theme,
  });
});
module.exports = {
  createThemes,
  updateTheme,
  getTheme,
  getThemeBySlug,
  getAllThemes,
  deleteTheme,
};
