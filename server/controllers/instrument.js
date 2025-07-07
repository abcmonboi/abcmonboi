const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const { response } = require("express");
const Instrument = require("../models/instrument");

const createInstrument = asyncHandler(async (req, res) => {
  if (Object.keys(req.body).length === 0) throw new Error("Missing inputs");
  if (req.body && req.body.name) req.body.slug = slugify(req.body.name).toLowerCase()
  const { slug } = req.body;
  const instrument = await Instrument.findOne({ slug });
  if (instrument)
    req.body.slug = slugify(req.body.name).toLowerCase() + "-" + Date.now().toString();

  const newInstrument = await Instrument.create(req.body);
  return res.status(200).json({
    success: newInstrument ? true : false,
    data: newInstrument ? newInstrument : "Something went wrong",
    msg: newInstrument
      ? "Instrument created successfully"
      : "Instrument created failed",
  });
});
const getAllInstrument = asyncHandler(async (req, res) => {
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
  let queryCommand = Instrument.find(formatedQueries);

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
    const counts = await Instrument.find(formatedQueries).countDocuments();
    if (counts === 0) return res.status(200).json({ msg: "Không có instrument", success: true, data: [] });
    if (skip >= counts) throw new Error("This page does not exist");
  }

  // Execute query
  // Số lượng bài hát thỏa mãn điều kiện !== số lượng sp trả về 1 lần gọi API
  queryCommand.exec(async (err, response) => {
    if (err) throw new Error(err.message);
    const counts = await Instrument.find(formatedQueries).countDocuments();
    return res.status(200).json({
      success: response ? true : false,
      counts,
      limit,
      skip,
      data: response ? response : "Something went wrong",
      msg: response
        ? "Get all Instruments successfully"
        : "Get all Instruments failed",
    });
  });
});
const getInstrumentById = asyncHandler(async (req, res) => {
  // get id from request query params
  const { gid } = req.params;
  const instrument = await Instrument.findById(gid);
  if (!instrument) throw new Error("Instrument not found");
  return res.status(200).json({
    msg: instrument ? "Get Instrument successfully" : "Get Instrument failed",
    success: instrument ? true : false,
    data: instrument,
  });
});
const updateInstrument = asyncHandler(async (req, res) => {
  const { gid } = req.params;
  if (req.body && req.body.name) req.body.slug = slugify(req.body.name).toLowerCase()
  const newInstrument = await Instrument.findByIdAndUpdate(gid, req.body, {
    new: true,
  });
  await newInstrument.save();
  return res.status(200).json({
    success: newInstrument ? true : false,
    data: newInstrument,
    msg: newInstrument
      ? "Instrument updated successfully"
      : "Instrument updated failed",
  });
});
const deleteInstrument = asyncHandler(async (req, res) => {
  const { gid } = req.params;
  const ins = await Instrument.findByIdAndRemove(gid);
  return res.status(200).json({
    success: ins ? true : false,
    msg: ins ? "Instrument deleted successfully" : "Instrument deleted failed",
    dataDeleted: ins,
  });
});
module.exports = {
  createInstrument,
  getAllInstrument,
  getInstrumentById,
  updateInstrument,
  deleteInstrument,
};
