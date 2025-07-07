const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const { response } = require("express");
const videoTheme = require("../models/videotheme");

const createVideoTheme = asyncHandler(async (req, res) => {
  if (Object.keys(req.body).length === 0) throw new Error("Missing inputs");
  if (req.body && req.body.name) req.body.slug = slugify(req.body.name).toLowerCase()
  const { slug } = req.body;
  const vTheme = await videoTheme.findOne({ slug });
  if (vTheme)
    req.body.slug = slugify(req.body.name).toLowerCase() + "-" + Date.now().toString();

  const newVTheme = await videoTheme.create(req.body);
  return res.status(200).json({
    success: newVTheme ? true : false,
    data: newVTheme ? newVTheme : "Something went wrong",
    msg: newVTheme
      ? "VideoTheme created successfully"
      : "VideoTheme created failed",
  });
});
const getAllVideoTheme = asyncHandler(async (req, res) => {
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
  let queryCommand = videoTheme.find(formatedQueries);

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
  const limit = parseInt(req.query.limit) || undefined;
  const skip = (page - 1) * limit;
  queryCommand = queryCommand.skip(skip).limit(limit);
  if (req.query.page) {
    const counts = await videoTheme.find(formatedQueries).countDocuments();
    if (counts === 0) return res.status(200).json({ msg: "Không có mood" });
    if (skip >= counts) throw new Error("This page does not exist");
  }

  // Execute query
  // Số lượng bài hát thỏa mãn điều kiện !== số lượng sp trả về 1 lần gọi API
  queryCommand.exec(async (err, response) => {
    if (err) throw new Error(err.message);
    const counts = await videoTheme.find(formatedQueries).countDocuments();
    return res.status(200).json({
      success: response ? true : false,
      counts,
      limit,
      data: response ? response : "Something went wrong",
      msg: response
        ? "Get all videothemes successfully"
        : "Get all videothemes failed",
    });
  });
});
const getVideoThemeById = asyncHandler(async (req, res) => {
  // get id from request query params
  const { gid } = req.params;
  const vTheme = await videoTheme.findById(gid);
  if (!vTheme) throw new Error("Video theme not found");
  return res.status(200).json({
    msg: vTheme ? "Get video theme successfully" : "Get video theme failed",
    success: vTheme ? true : false,
    data: vTheme,
  });
});
const updateVideoTheme = asyncHandler(async (req, res) => {
  const { gid } = req.params;
  if (req.body && req.body.name) req.body.slug = slugify(req.body.name).toLowerCase()
  const newVtheme = await videoTheme.findByIdAndUpdate(gid, req.body, {
    new: true,
  });
  await newVtheme.save();
  return res.status(200).json({
    success: newVtheme ? true : false,
    data: newVtheme,
    msg: newVtheme ? "Mood updated successfully" : "Mood updated failed",
  });
});
const deleteVideoTheme = asyncHandler(async (req, res) => {
  const { gid } = req.params;
  const vTheme = await videoTheme.findByIdAndRemove(gid);
  return res.status(200).json({
    success: vTheme ? true : false,
    msg: vTheme
      ? "Video Theme deleted successfully"
      : "Video Theme deleted failed",
    dataDeleted: vTheme,
  });
});
module.exports = {
  createVideoTheme,
  getAllVideoTheme,
  getVideoThemeById,
  updateVideoTheme,
  deleteVideoTheme,
};
