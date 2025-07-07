const Sfx = require("../models/sfx");
const Artist = require("../models/artist");
const SfxCate = require("../models/sfxCategory");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const { response } = require("express");

const createSfx = asyncHandler(async (req, res) => {
  if (Object.keys(req.body).length === 0) throw new Error("Missing inputs");
  if (req.body && req.body.title) req.body.slug = slugify(req.body.title).toLowerCase()
  const { slug } = req.body;
  const sfx = await Sfx.findOne({ slug });
  if (sfx)
    req.body.slug = slugify(req.body.title).toLowerCase() + "-" + Date.now().toString();
  const newSfx = await Sfx.create(req.body);
  await newSfx.save();
  // console.log(fileData);

  return res.status(200).json({
    success: newSfx ? true : false,
    data: newSfx ? newSfx : "Something went wrong",
    msg: newSfx ? "Sfx created successfully" : "Sfx created failed",
  });
});
const excludedFields =
  "-refreshToken -password -_id -createdAt -updatedAt -role";
const getSfx = asyncHandler(async (req, res) => {
  // get id from request query params
  const { sfxid } = req.params;
  const sfx = await Sfx.findByIdAndUpdate(
    sfxid,
    { $inc: { numberView: 1 } },
    { new: true }
  )
    .populate("dislikes", excludedFields)
    .populate("likes", excludedFields)
    .populate("artists", "name _id slug")
    .populate("sfxCategory", "title _id slug");

  return res.status(200).json({
    success: sfx ? true : false,
    data: sfx ? sfx : "Sfx not found",
    msg: sfx ? "Sfx found successfully" : "Sfx not found",
  });
});
const getSfxBySlug = asyncHandler(async (req, res) => {
  // get id from request query params
  const { slug } = req.params;
  const sfx = await Sfx.findOne({ slug })
  .populate("dislikes", excludedFields)
  .populate("likes", excludedFields)
  .populate("artists",)
  .populate("sfxCategory", "title _id slug");
  if (
    !sfx ||
    sfx === null ||
    sfx === undefined ||
    sfx === "" ||
    sfx.length === 0
  ) {
    throw new Error("Song not found");
  } else {
    sfx.numberView = sfx.numberView + 1;
    await sfx.save();
    return res.status(200).json({
      msg: sfx ? "Get Song successfully" : "Get Song failed",
      success: sfx ? true : false,
      data: sfx,
    });
  }
});
// Filtering, Sorting, Pagination, Field Limiting
const getAllSfx = asyncHandler(async (req, res) => {
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
  let queryCommand = Sfx.find(formatedQueries)
    .populate("dislikes", excludedFields)
    .populate("likes", excludedFields)
    .populate("artists", "name _id slug")
    .populate("sfxCategory", "title _id slug");

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
  const limit = parseInt(req.query.limit) || process.env.LIMIT_SfxS;
  const skip = (page - 1) * limit;
  queryCommand = queryCommand.skip(skip).limit(limit);
  if (req.query.page) {
    const counts = await Sfx.find(formatedQueries).countDocuments();
    if (counts === 0) return res.status(200).json({ msg: "Không có hiệu ứng âm thanh nào", success: true, data: [] });
    if (skip >= counts) throw new Error("This page does not exist");
  }

  // Execute query
  // Số lượng bài hát thỏa mãn điều kiện !== số lượng sp trả về 1 lần gọi API
  queryCommand.exec(async (err, response) => {
    if (err) throw new Error(err.message);
    const counts = await Sfx.find(formatedQueries).countDocuments();
    return res.status(200).json({
      success: response ? true : false,
      counts,
      limit,
      data: response ? response : "Sfx not found",
      msg: response ? "Sfx found successfully" : "Sfx not found",
    });
  });
});
const getAllSfxByCategorySlug = asyncHandler(async (req, res) => {
  var { slug } = req.params;
  SfxCate.findOne({ slug: slug }, async (err, sfxCategory) => {
    if (err) throw new Error(err.message);
    if (!sfxCategory) throw new Error("SfxCategory not found");
    const counts = await Sfx.find({ sfxCategory: sfxCategory._id }).countDocuments();
    const sfx = await Sfx.find({ sfxCategory: sfxCategory._id, status:true })
    .populate("dislikes", excludedFields)
    .populate("likes", excludedFields)
    .populate("artists", "name _id slug")
    .populate("sfxCategory", "title _id slug");
    return res.status(200).json({
      counts: counts,
      success: sfx ? true : false,
      data: sfx ? sfx : "Get Sfx by Cate failed",
      msg: sfx ? "Get Sfx by Cate successfully" : "Get Sfx by Cate failed",
    });
  });
});
const getSimilarSfxByGenreSlug = asyncHandler(async (req, res) => {
  const queries = { ...req.query };
  const { slug } = req.params;
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

 
  //  allSong.find(formatedQueries)
  let queryCommand = Sfx.find(formatedQueries)
  .populate("dislikes", excludedFields)
  .populate("likes", excludedFields)
  .populate("artists",)
  .populate("sfxCategory", "title _id slug");
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
    const counts = await Sfx.find(formatedQueries).countDocuments();
    if (skip >= counts) throw new Error("This page does not exist");
  }

  // Execute query
  // Số lượng bài hát thỏa mãn điều kiện !== số lượng sp trả về 1 lần gọi API
  queryCommand.exec(async (err, response) => {
    if (err) throw new Error(err.message);
    response = response.filter((sfx) => {
      return sfx.sfxCategory.some((cate) => cate.slug === slug);
    });
    response = response.slice(0, 4);
    const counts = response.length;

    return res.status(200).json({
      success: response ? true : false,
      counts,
      limit,
      data: response ? response : "Song not found",
      msg: response ? "Song found successfully" : "Song not found",
    });
  });
});
const updateSfx = asyncHandler(async (req, res) => {
  const { sfxid } = req.params;
  if (req.body && req.body.title) req.body.slug = slugify(req.body.title).toLowerCase()

  const sfx = await Sfx.findByIdAndUpdate(sfxid, req.body, { new: true });
  await sfx.save();
  return res.status(200).json({
    success: sfx ? true : false,
    data: sfx,
    msg: sfx ? "Sfx updated successfully" : "Sfx updated failed",
  });
});
const deleteSfx = asyncHandler(async (req, res) => {
  const { sfxid } = req.params;
  const sfx = await Sfx.findByIdAndRemove(sfxid);
  return res.status(200).json({
    success: sfx ? true : false,
    msg: sfx ? "Sfx deleted successfully" : "Sfx deleted failed",
    dataDeleted: sfx,
  });
});
const getAllSfxByArtistSlug = asyncHandler(async (req, res) => {
  var { slug } = req.params;
  const artist = await Artist.findOne({ slug: slug });
  if (!artist || artist === undefined || artist.length === 0)
    throw new Error("Artist not found");
  const sfxs = await Sfx.find({ artists: artist._id , status: true
   })
    .populate("artists", "name _id slug")
    .populate("sfxCategory", "title _id slug");

  return res.status(200).json({
    success: sfxs ? true : false,
    data: sfxs ? sfxs : "Get all sfx by artist slug failed",
    msg: sfxs
      ? "Get all sfx by artist slug successfully"
      : "Get all sfx by artist slug failed",
  });
});
/**
 * Khi người dùng like một bài thì:
 * 1. Check xem người đó có dislike hay không = > bỏ dislike
 * 2. Check xem người đó có like hay không => bỏ like hoặc thêm like
 *
 */
const likeSfx = asyncHandler(async (req, res) => {
  const { uid } = req.user;
  const { sfxid } = req.params;
  if (!sfxid) throw new Error("Missing sfxid");
  const sfx = await Sfx.findById(sfxid);
  const alreadyDisliked = sfx?.dislikes.find((el) => el.toString() === uid);
  if (alreadyDisliked) {
    const response = await Sfx.findByIdAndUpdate(
      sfxid,
      {
        $pull: { dislikes: uid },
        totalDislikes: sfx.totalDislikes - 1,
        totalLikes: sfx.totalLikes + 1,
        likes: uid,
      },
      { new: true }
    );
    return res.status(200).json({
      success: response ? true : false,
      data: response,
      msg: response ? "Sfx disliked successfully" : "Sfx disliked failed",
    });
  }
  const isLiked = sfx?.likes.find((el) => el.toString() === uid);
  if (isLiked) {
    const response = await Sfx.findByIdAndUpdate(
      sfxid,
      { $pull: { likes: uid }, totalLikes: sfx.totalLikes - 1 },
      { new: true }
    );
    return res.status(200).json({
      success: response ? true : false,
      data: response,
      msg: response ? "Sfx unlike successfully" : "Sfx unlike failed",
    });
  } else {
    const response = await Sfx.findByIdAndUpdate(
      sfxid,
      { $push: { likes: uid }, totalLikes: sfx.totalLikes + 1 },
      { new: true }
    );
    return res.status(200).json({
      success: response ? true : false,
      data: response,
      msg: response ? "Sfx liked successfully" : "Sfx liked failed",
    });
  }
});

const dislikeSfx = asyncHandler(async (req, res) => {
  const { uid } = req.user;
  const { sfxid } = req.params;
  if (!sfxid) throw new Error("Missing sfxid");
  const sfx = await Sfx.findById(sfxid);
  const alreadyLiked = sfx?.likes.find((el) => el.toString() === uid);
  if (alreadyLiked) {
    const response = await Sfx.findByIdAndUpdate(
      sfxid,
      {
        $pull: { likes: uid },
        totalLikes: sfx.totalLikes - 1,
        totalDislikes: sfx.totalDislikes + 1,
        dislikes: uid,
      },
      { new: true }
    );
    return res.status(200).json({
      success: response ? true : false,
      data: response,
      msg: response ? "Sfx disliked successfully" : "Sfx disliked failed",
    });
  }
  const isDisliked = sfx?.dislikes.find((el) => el.toString() === uid);
  if (isDisliked) {
    const response = await Sfx.findByIdAndUpdate(
      sfxid,
      { $pull: { dislikes: uid }, totalDislikes: sfx.totalDislikes - 1 },
      { new: true }
    );
    return res.status(200).json({
      success: response ? true : false,
      data: response,
      msg: response ? "Sfx undisliked successfully" : "Sfx undisliked failed",
    });
  } else {
    const response = await Sfx.findByIdAndUpdate(
      sfxid,
      { $push: { dislikes: uid }, totalDislikes: sfx.totalDislikes + 1 },
      { new: true }
    );
    return res.status(200).json({
      success: response ? true : false,
      data: response,
      msg: response ? "Sfx disliked successfully" : "Sfx disliked failed",
    });
  }
});
const searchSfxByTitle = asyncHandler(async (req, res) => {
  const { q } = req.params;
  if (!q) throw new Error("Missing inputs");
  const sfxs = await Sfx.find({
    $or: [
      { title: { $regex: q, $options: "i" } },
      { slug: { $regex: q, $options: "i" } },
    ],
    status: true 
  })
    .populate("artists", "name _id slug")
    .populate("sfxCategory", "title _id slug");

  return res.status(200).json({
    success: sfxs ? true : false,
    data: sfxs ? sfxs : "Sfx not found",
    msg: sfxs ? "Sfx found successfully" : "Sfx not found",
  });
});
const countListen = asyncHandler(async (req, res) => {
  const { sid } = req.params;
  const sfx = await Sfx.findById(sid);
  sfx.listen = sfx.listen + 1;
  sfx.numberView = sfx.numberView + 1;
  await sfx.save();
  return res.status(200).json({
    success: sfx ? true : false,
    listen: sfx?.listen,
    numberView: sfx?.numberView,
    msg: sfx ? "Listen count + 1" : "Listen count failed to update",
  });
});
const countDownload = asyncHandler(async (req, res) => {
  const { sid } = req.params;
  const sfx = await Sfx.findById(sid);
  sfx.downloads = sfx.downloads + 1;
  await sfx.save();
  return res.status(200).json({
    success: sfx ? true : false,
    downloads: sfx?.downloads,
    msg: sfx ? "Downloads + 1" : "Downloads to update",
  });
});
module.exports = {
  createSfx,
  getSfx,
  getAllSfx,
  updateSfx,
  deleteSfx,
  likeSfx,
  dislikeSfx,
  getAllSfxByArtistSlug,
  searchSfxByTitle,
  getAllSfxByCategorySlug,
  getSfxBySlug,
  getSimilarSfxByGenreSlug,
  countListen,
  countDownload,
};
