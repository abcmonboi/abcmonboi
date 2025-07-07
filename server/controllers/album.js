const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const { response } = require("express");
const Album = require("../models/album");
const Genre = require("../models/genre");
const Artist = require("../models/artist");

const createAlbum = asyncHandler(async (req, res) => {
  if (Object.keys(req.body).length === 0) throw new Error("Missing inputs");
  if (req.body && req.body.title)
    req.body.slug = slugify(req.body.title).toLowerCase();
  const { slug } = req.body;
  const album = await Album.findOne({ slug });

  if (album) {
    const tempSong1 = await Album.find({ slug: { $regex: slug } });
    const existSlug = tempSong1?.map((song) => song.slug);
    const existNumberHighest = existSlug
      ?.map((slug) => slug.replace(/[^0-9]/g, ""))
      .sort((a, b) => b - a)[0];
    if (existNumberHighest) {
      const replaceNumber = Number(existNumberHighest) + 1;
      req.body.slug = slug + "(" + replaceNumber + ")";
    } else {
      req.body.slug = slug + "(" + 1 + ")";
    }
  } else {
    req.body.slug = slug;
  }
  if (req.body.album_art) {
    if (!req.body.album_cover) {
      req.body.album_cover = req.body.album_art;
    }
    // req.body.album_cover = Album.findByIdAndUpdate(aid).album_art;
  }
  const newAlbum = await Album.create(req.body);

  return res.status(200).json({
    success: newAlbum ? true : false,
    data: newAlbum ? newAlbum : "Something went wrong",
    msg: newAlbum ? "Album created successfully" : "Album created failed",
  });
});
const getAllAlbums = asyncHandler(async (req, res) => {
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
  // if (queries?.title)
  //   formatedQueries.title = { $regex: queries.title, $options: "i" };
  if(queries?.title === "") {
    delete formatedQueries.title;
  }
  if (queries?.title) {
    delete formatedQueries.title;
    formatedQueries.$text = { $search: `\`"${queries.title}"\`` };
  }

  let queryCommand = Album.find(formatedQueries)
    .populate("genres", "name _id slug")
    .populate("artists", "name _id slug");

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
  const limit = parseInt(req.query.limit) || 0;
  const skip = (page - 1) * limit;
  queryCommand = queryCommand.skip(skip).limit(limit);
  if (req.query.page) {
    const counts = await Album.find(formatedQueries).countDocuments();
    if (counts === 0) return res.status(200).json({ msg: "Không có album" });
    if (skip >= counts) throw new Error("This page does not exist");
  }

  // Execute query
  // Số lượng bài hát thỏa mãn điều kiện !== số lượng sp trả về 1 lần gọi API
  queryCommand.exec(async (err, response) => {
    if (err) throw new Error(err.message);
    const counts = await Album.find(formatedQueries).countDocuments();
    return res.status(200).json({
      success: response ? true : false,
      counts,
      limit,
      skip,
      data: response ? response : "Something went wrong",
      msg: response ? "Get all Albums successfully" : "Get all Albums failed",
    });
  });
});
const getAlbumById = asyncHandler(async (req, res) => {
  // get id from request query params
  const { aid } = req.params;
  const album = await Album.findById(aid)
    .populate("genres", "name _id slug")
    .populate("artists", "name _id slug");
  if (!album) throw new Error("Album not found");
  return res.status(200).json({
    msg: album ? "Get Album successfully" : "Get Album failed",
    success: album ? true : false,
    data: album,
  });
});
const getAlbumBySlug = asyncHandler(async (req, res) => {
  // get id from request query params
  const { slug } = req.params;
  const album = await Album.findOne({ slug: slug })
    .populate("genres", "name _id slug")
    .populate("artists", "name _id slug");
  if (!album) throw new Error("Album not found");
  return res.status(200).json({
    msg: album ? "Get Album successfully" : "Get Album failed",
    success: album ? true : false,
    data: album,
  });
});
const getAlbumbyArtistSlug = asyncHandler(async (req, res) => {
  // get id from request query params
  const { slug } = req.params;
  const artist = await Artist.find({ slug: slug });
  if (!artist || artist === undefined || artist.length === 0) {
    throw new Error("Artist not found");
  } else {
    const album = await Album.find({ artists: artist[0]._id, isActive: true })
      .populate("genres", "name _id slug")
      .populate("artists", "name _id slug");
    if (!album) throw new Error("Album not found");
    return res.status(200).json({
      msg: album
        ? "Get Album by Artist successfully"
        : "Get Album by Artist failed",
      success: album ? true : false,
      data: album,
    });
  }
});

const updateAlbum = asyncHandler(async (req, res) => {
  const { aid } = req.params;
  const currentAlbum = await Album.findById(aid);

  if (req.body && req.body.title) {
    req.body.slug = slugify(req.body.title).toLowerCase();
  }
  const { slug } = req.body;
  const albumSlug = await Album.findOne({ slug });

  if (albumSlug) {
    const tempAlbums = await Album.find({ slug: { $regex: slug } });
    if (tempAlbums.length >= 1) {
     const tempSlug = tempAlbums.find(
        (album) => album._id.toString() === aid.toString()
      )?.slug;
      if (tempSlug) {
        req.body.slug = tempSlug;
      } else {
        const existSlug = tempAlbums?.map((song) => song.slug);
        const existNumberHighest = existSlug
          ?.map((slug) => slug.replace(/[^0-9]/g, ""))
          .sort((a, b) => b - a)[0];
        if (existNumberHighest) {
          const replaceNumber = Number(existNumberHighest) + 1;
          req.body.slug = slug + "(" + replaceNumber + ")";
        } else {
          req.body.slug = slug + "(" + 1 + ")";
        }
      }

      // req.body.slug = slug;
    }
  } else {
    req.body.slug = slug;
  }
  if (!req.body.album_cover) {
    req.body.album_cover = currentAlbum.album_art;
    // req.body.album_cover = Album.findByIdAndUpdate(aid).album_art;
  }
  const newAlbum = await Album.findByIdAndUpdate(aid, req.body, { new: true });

  return res.status(200).json({
    success: newAlbum ? true : false,
    data: newAlbum,
    msg: newAlbum ? "album updated successfully" : "album updated failed",
  });
});
const deleteAlbum = asyncHandler(async (req, res) => {
  const { aid } = req.params;
  const album = await Album.findByIdAndRemove(aid);
  return res.status(200).json({
    success: album ? true : false,
    msg: album ? "album deleted successfully" : "album deleted failed",
    dataDeleted: album,
  });
});
const searchAlbumByTitle = asyncHandler(async (req, res) => {
  const { q } = req.params;
  if (!q) throw new Error("Missing inputs");
  // const albums = await Album.find({
  //   $or: [
  //     { title: { $regex: q, $options: "i" } },
  //     { slug: { $regex: q, $options: "i" } },
  //   ],
  //   isActive: true
  // })
  const albums = await Album.find({
    $text: { $search: '"' + q + '"' },
    isActive: true,
  })
    .populate("genres", "name _id slug")
    .populate("artists", "name _id slug");

  return res.status(200).json({
    success: albums ? true : false,
    data: albums ? albums : "Albums not found",
    msg: albums ? "Albums found successfully" : "Albums not found",
  });
});
module.exports = {
  createAlbum,
  getAllAlbums,
  getAlbumById,
  updateAlbum,
  deleteAlbum,
  getAlbumBySlug,
  getAlbumbyArtistSlug,
  searchAlbumByTitle,
};
