const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const { response } = require("express");
const Genre = require("../models/genre");
const Song = require("../models/song");

const createGenre = asyncHandler(async (req, res) => {

  if (Object.keys(req.body).length === 0) throw new Error("Missing inputs");
  if (req.body && req.body.name) req.body.slug =  slugify(req.body.name).toLowerCase()
  const { slug } = req.body;
  const genre = await Genre.findOne({ slug });
  if (genre)
    req.body.slug = slugify(req.body.name).toLowerCase() + "-" + Date.now().toString();
  const newGenre = await Genre.create(req.body);
  return res.status(200).json({
    success: newGenre ? true : false,
    data: newGenre ? newGenre : "Something went wrong",
    msg: newGenre ? "Genre created successfully" : "Genre created failed",
  });
});
const getAllGenres = asyncHandler(async (req, res) => {
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
  if (queries?.title) {
    delete formatedQueries.title;
    // formatedQueries.$text = { $search: `\`"${queries.title}"\`` };
    formatedQueries.$text = { $search: `${queries.title}` };
  }
  let queryCommand = Genre.find(formatedQueries);

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
  const limit = parseInt(req.query.limit) || process.env.LIMIT_GenreS;
  const skip = (page - 1) * limit;
  queryCommand = queryCommand.skip(skip).limit(limit);
  if (req.query.page) {
    const counts = await Genre.find(formatedQueries).countDocuments();
    if (counts === 0) return res.status(200).json({ msg: "Không có genre", success: true, data: [] });

    if (skip >= counts) throw new Error("This page does not exist");
  }

  // Execute query
  // Số lượng bài hát thỏa mãn điều kiện !== số lượng sp trả về 1 lần gọi API
  queryCommand.exec(async (err, response) => {
    if (err) throw new Error(err.message);
    const counts = await Genre.find(formatedQueries).countDocuments();
    return res.status(200).json({
      success: response ? true : false,
      counts,
      limit,
      skip,

      data: response ? response : "Something went wrong",
      msg: response ? "Get all Genres successfully" : "Get all Genres failed",
    });
  });
});
const getGenreById = asyncHandler(async (req, res) => {
  // get id from request query params
  const { gid } = req.params;
  const genre = await Genre.findById(gid);
  if (!genre) throw new Error("Genre not found");
  return res.status(200).json({
    msg: genre ? "Get Genre successfully" : "Get Genre failed",
    success: genre ? true : false,
    data: genre ,
  });
});
const updateGenre = asyncHandler(async (req, res) => {
  const { gid } = req.params;
  if (req.body && req.body.name) req.body.slug =  slugify(req.body.name).toLowerCase()
  const newGenre = await Genre.findByIdAndUpdate(gid, req.body, { new: true });
  return res.status(200).json({
    success: newGenre ? true : false,
    data: newGenre,
    msg: newGenre ? "Genre updated successfully" : "Genre updated failed",
  });
});
const deleteGenre = asyncHandler(async (req, res) => {
  const { gid } = req.params;
  const genre = await Genre.findByIdAndRemove(gid);
  return res.status(200).json({
    success: genre ? true : false,
    msg: genre ? "Genre deleted successfully" : "Genre deleted failed",
    dataDeleted: genre,
  });
});
module.exports = {
  createGenre,
  getAllGenres,
  getGenreById,
  updateGenre,
  deleteGenre,
};
