const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const { response } = require("express");
const Artist = require("../models/artist");
const utf8 = require("utf8");

const createArtist = asyncHandler(async (req, res) => {
  if (Object.keys(req.body).length === 0) throw new Error("Missing inputs");
  if (req.body && req.body.name) req.body.slug = slugify(req.body.name).toLowerCase()
  const { slug } = req.body;
  const artist = await Artist.findOne({ slug });
  if (artist) {
    const tempArtist = await Artist.find({ slug: { $regex: slug } });
    const existSlug = tempArtist?.map((item) => item.slug);

    const existSlugLength = existSlug?.length;
    if (existSlugLength > 0) {
      req.body.slug = `${slug}(${existSlugLength})`;
    } else {
      req.body.slug = `${slug}(1)`;
    }
  } else {
    req.body.slug = slug;
  }

  
  const newArtist = await Artist.create(req.body);
  // console.log(req.body)
  await newArtist.save();
  return res.status(200).json({
    success: newArtist ? true : false,
    data: newArtist ? newArtist : "Something went wrong",
    msg: newArtist ? "Artist created successfully" : "Artist created failed",
  });
});
const getAllArtists = asyncHandler(async (req, res) => {
  const queries = { ...req.query };
  // Tách các trường đặc biệt ra khỏi query
  const excludedFields = ["sort", "page", "limit", "fields"];
  excludedFields.forEach((el) => delete queries[el]);

  // Format lại các operator cho đúng cú pháp của mongoose
  let queryString = JSON.stringify(queries);
  queryString = queryString.replace(
    /\b(gte|gt|lte|lt)\b/g,
    (match) => `$${match}`
  );
  const formatedQueries = JSON.parse(queryString);
  /**
   * {quantity }
   */
  //Filtering một từ trong tên có chứa từ khóa, lọc theo trường nào và ko lấy trường nào
  if (queries?.title)
    formatedQueries.title = { $regex: queries.title, $options: "i" };
  let queryCommand = Artist.find(formatedQueries);

  // Sorting
  // abc,efg => [abc,efg]
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    queryCommand = queryCommand.sort(sortBy);
  } else {
    queryCommand = queryCommand.sort("-createdAt");
  }

  // Fields limiting
  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    queryCommand = queryCommand.select(fields);
  } else {
    queryCommand = queryCommand.select("-__v");
  }
  // Pagination
  // limit: số object trả về 1 lần gọi API
  // skip = (page - 1) * limit => số object bỏ qua
  // 1 2 3 .... 10
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || process.env.LIMIT_ArtistS;
  const skip = (page - 1) * limit;
  queryCommand = queryCommand.skip(skip).limit(limit);
  if (req.query.page) {
    const counts = await Song.find(formatedQueries).countDocuments();
    if (skip >= counts) throw new Error("This page does not exist");
  }

  // Execute query
  // Số lượng bài hát thỏa mãn điều kiện !== số lượng sp trả về 1 lần gọi API
  queryCommand.exec(async (err, response) => {
    if (err) throw new Error(err.message);
    const counts = await Artist.find(formatedQueries).countDocuments();
    return res.status(200).json({
      success: response ? true : false,
      counts,
      limit,
      data: response ? response : "Something went wrong",
      msg: response ? "Get all Artists successfully" : "Get all Artists failed",
    });
  });
});
const getArtistById = asyncHandler(async (req, res) => {
  // get id from request query params
  const { arid } = req.params;
  const artist = await Artist.findById(arid);
  if (!artist) throw new Error("Artist not found");
  return res.status(200).json({
    msg: artist ? "Get Artist successfully" : "Get Artist failed",
    success: artist ? true : false,
    data: artist,
  });
});
const getArtistBySlug = asyncHandler(async (req, res) => {
  // get id from request query params
  const { slug } = req.params;
  const artist = await Artist.findOne({ slug });
  if (
    !artist ||
    artist === null ||
    artist === undefined ||
    artist === "" ||
    artist.length === 0
  ) {
    throw new Error("Artist not found");
  } else {
    return res.status(200).json({
      msg: artist ? "Get Artist successfully" : "Get Artist failed",
      success: artist ? true : false,
      data: artist,
    });
  }
});

const updateArtist = asyncHandler(async (req, res) => {
  const { arid } = req.params;
  if (req.body && req.body.name) req.body.slug = slugify(req.body.name, { lower: true })

  const { slug } = req.body;
  const artistSlug = await Artist.findOne({ slug });

  if (artistSlug) {
    const tempArtist = await Artist.find({ slug: { $regex: slug } });

    if (tempArtist.length >= 1) {
      const tempSlug = tempArtist.find(
        (theme) => theme._id.toString() === arid.toString()
      )?.slug;
      if (tempSlug) {
        req.body.slug = tempSlug;
      } else {
        const existSlug = tempArtist?.map((theme) => theme.slug);
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
    }
  } else {
    req.body.slug = slug;
  }

  const newArtist = await Artist.findByIdAndUpdate(arid, req.body, {
    new: true,
  });

  await newArtist.save();

  return res.status(200).json({
    success: newArtist ? true : false,
    data: newArtist,
    msg: newArtist ? "Artist updated successfully" : "Artist updated failed",
  });
});
const deleteArtist = asyncHandler(async (req, res) => {
  const { arid } = req.params;
  const artist = await Artist.findByIdAndRemove(arid);
  return res.status(200).json({
    success: artist ? true : false,
    msg: artist ? "Artist deleted successfully" : "Artist deleted failed",
    dataDeleted: artist,
  });
});
const searchArtistByTitle = asyncHandler(async (req, res) => {
  const { q } = req.params;
  if (!q) throw new Error("Missing inputs");
  const artists = await Artist.find({ $text: { $search: q } });

  return res.status(200).json({
    success: artists ? true : false,
    data: artists ? artists : "Artists not found",
    msg: artists ? "Artists found successfully" : "Artists not found",
  });
});
module.exports = {
  createArtist,
  getAllArtists,
  getArtistById,
  updateArtist,
  deleteArtist,
  getArtistBySlug,
  searchArtistByTitle,
};
