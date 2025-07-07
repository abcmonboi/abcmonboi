const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const { response } = require("express");
const SfxCategory = require("../models/sfxCategory");

const createSfxCategory = asyncHandler(async (req, res) => {

  if (Object.keys(req.body).length === 0) throw new Error("Missing inputs");
  if (req.body && req.body.title) req.body.slug =slugify(req.body.title).toLowerCase()
  const { slug } = req.body;
  const sfxCategory = await SfxCategory.findOne({ slug });
  if (sfxCategory)
    req.body.slug = slugify(req.body.title).toLowerCase() + "-" + Date.now().toString();
  const newSfxCategory = await SfxCategory.create(req.body);
  return res.status(200).json({
    success: newSfxCategory ? true : false,
    data: newSfxCategory ? newSfxCategory : "Something went wrong",
    msg: newSfxCategory ? "SfxCategory created successfully" : "SfxCategory created failed",
  });
});
const getAllSfxCategorys = asyncHandler(async (req, res) => {
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
  let queryCommand = SfxCategory.find(formatedQueries);

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
    const counts = await SfxCategory.find(formatedQueries).countDocuments();
    if (counts === 0) return res.status(200).json({ msg: "Không có thể loại nào" });
    if (skip >= counts) throw new Error("This page does not exist");
  }

  // Execute query
  // Số lượng bài hát thỏa mãn điều kiện !== số lượng sp trả về 1 lần gọi API
  queryCommand.exec(async (err, response) => {
    if (err) throw new Error(err.message);
    const counts = await SfxCategory.find(formatedQueries).countDocuments();
    return res.status(200).json({
      success: response ? true : false,
      counts,
      limit,
      data: response ? response : "Something went wrong",
      msg: response ? "Get all SfxCategorys successfully" : "Get all SfxCategorys failed",
    });
  });
});
const getSfxCategoryById = asyncHandler(async (req, res) => {
  // get id from request query params
  const { SfxCateID } = req.params;
  const sfxCategory = await SfxCategory.findById(SfxCateID);
  if (!sfxCategory) throw new Error("SfxCategory not found");
  return res.status(200).json({
    msg: sfxCategory ? "Get SfxCategory successfully" : "Get SfxCategory failed",
    success: sfxCategory ? true : false,
    data: sfxCategory ,
  });
});
const getSfxCategoryBySlug = asyncHandler(async (req, res) => {
  // get id from request query params 
  const { slug } = req.params;
  const sfxCate = await SfxCategory.findOne({ slug });
  if (!sfxCate || sfxCate === null || sfxCate === undefined || sfxCate === "" || sfxCate.length === 0){
    throw new Error("Sfx Category not found");
  } else {
    return res.status(200).json({
      msg: sfxCate ? "Get Sfx Category successfully" : "Get Sfx Category failed",
      success: sfxCate ? true : false,
      data: sfxCate ,
    });
  }
});
const updateSfxCategory = asyncHandler(async (req, res) => {
  const { SfxCateID } = req.params;
  if (req.body && req.body.title) req.body.slug = slugify(req.body.title).toLowerCase()
  const newSfxCategory = await SfxCategory.findByIdAndUpdate(SfxCateID, req.body, { new: true });
  return res.status(200).json({
    success: newSfxCategory ? true : false,
    data: newSfxCategory,
    msg: newSfxCategory ? "SfxCategory updated successfully" : "SfxCategory updated failed",
  });
});
const deleteSfxCategory = asyncHandler(async (req, res) => {
  const { SfxCateID } = req.params;
  const sfxCategory = await SfxCategory.findByIdAndRemove(SfxCateID);
  return res.status(200).json({
    success: sfxCategory ? true : false,
    msg: sfxCategory ? "SfxCategory deleted successfully" : "SfxCategory deleted failed",
    dataDeleted: sfxCategory,
  });
});
module.exports = {
  createSfxCategory,
  getAllSfxCategorys,
  getSfxCategoryById,
  updateSfxCategory,
  deleteSfxCategory,
  getSfxCategoryBySlug,
};
