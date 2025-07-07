const Collection = require("../models/collection");
const Song = require("../models/song");
const Album = require("../models/album");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const fs = require("fs");

// const JSZip = require("jszip");
const createCollection = asyncHandler(async (req, res) => {
  if (Object.keys(req.body).length === 0) throw new Error("Missing inputs");
  if (req.body && req.body.title)
    req.body.slug = slugify(req.body.title).toLowerCase();
  const { slug } = req.body;
  const collection = await Collection.findOne({ slug });

  if (collection) {
    const tempCollection = await Collection.find({ slug: { $regex: slug } });
    const existSlug = tempCollection?.map((item) => item.slug);

    const existSlugLength = existSlug?.length;
    if (existSlugLength > 0) {
      req.body.slug = `${slug}(${existSlugLength})`;
    } else {
      req.body.slug = `${slug}(1)`;
    }
  } else {
    req.body.slug = slug;
  }
  // if (collection)
  //   req.body.slug =
  //     slugify(req.body.title).toLowerCase() + "-" + Date.now().toString();

  const newCollection = await Collection.create(req.body);
  await newCollection.save();
  return res.status(200).json({
    success: newCollection ? true : false,
    data: newCollection ? newCollection : "Something went wrong",
    msg: newCollection
      ? "Collection created successfully"
      : "Collection created failed",
  });
});
const getCollection = asyncHandler(async (req, res) => {
  // get id from request query params
  const { collectionid } = req.params;
  const pageSong = parseInt(req.query.pageSong) || 1;
  const limitSong = parseInt(req.query.limitSong) || 0;
  const skipSong = (pageSong - 1) * limitSong;
  let fieldsSong = "";
  if (req.query.fieldsSong) {
    fieldsSong = req.query.fieldsSong.split(",").join(" ");
  } else {
    fieldsSong = "-__v -instruments -videothemes -genres"
  }
  const collection = await Collection.findById(collectionid)
    //get limit song in collection
    .populate("album")
    .populate({
      path: "sfx",
      //fields
      select: `${fieldsSong}`,
      //filter
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
      ],
    })

    .populate({
      path: "song",
      //fields
      select: `${fieldsSong}`,
      //filter
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
        "license"
      ],
    });
  //counts song in collection
  const counts = await Collection.findById(collectionid).populate("song");
  if (!collection) throw new Error("Collection not found");

  return res.status(200).json({
    songCount: counts.song?.length,
    songSkip: skipSong,
    songLimit : limitSong,
    success: collection ? true : false,
    data: collection ? collection : "Collection not found",
    msg: collection ? "Collection found successfully" : "Collection not found",
  });
});
const getCollectionbySlug = asyncHandler(async (req, res) => {
  const queries = { ...req.query };
  // get id from request query params
  // Tách các trường đặc biệt ra khỏi query
  const pageSong = parseInt(req.query.pageSong) || 1;
  const limitSong = parseInt(req.query.limitSong) || 0;
  const skipSong = (pageSong - 1) * limitSong;
  let fieldsSong = "";
  if (req.query.fieldsSong) {
    fieldsSong = req.query.fieldsSong.split(",").join(" ");
  } else {
    fieldsSong = "-__v -instruments -videothemes -album -genres"
  }
  const { slug } = req.params;
  const collection = await Collection.findOne({ slug: slug })
    .populate("album")
    .populate({
      path: "sfx",
      //fields
      select: `${fieldsSong}`,
      //filter
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
      ],
    })
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
        "license"
      ],
    });

  //counts song in collection
  const counts = await Collection.findOne({ slug: slug }).populate("song");

  if (!collection) throw new Error("Collection not found");
  return res.status(200).json({
    songCount: counts.song?.length,
    songSkip: skipSong,
    songLimit : limitSong,
    msg: collection ? "Get Collection successfully" : "Get Collection failed",
    success: collection ? true : false,
    data: collection,
  });
});
// Filtering, Sorting, Pagination, Field Limiting
const getAllMusicCollection = asyncHandler(async (req, res) => {
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
    formatedQueries.title = { $regex: queries.title, $options: "i" };
  }
  let queryCommand = Collection.find({
    ...formatedQueries,
    collection_type: 1,
  })
    .populate("album", "title _id slug")
    .populate("song", "title _id slug")
    .populate("sfx", "title _id slug");

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
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  queryCommand = queryCommand.skip(skip).limit(limit);
  if (req.query.page) {
    const counts = await Collection.find({
      ...formatedQueries,
      collection_type: 1,
    }).countDocuments();
    if (counts === 0)
      return res.status(200).json({
        msg: "Không có Music collection nào",
        success: true,
        data: [],
      });
    if (skip >= counts) throw new Error("This page does not exist");
  }
  queryCommand.exec(async (err, response) => {
    if (err) throw new Error(err.message);
    const counts = await Collection.find({
      ...formatedQueries,
      collection_type: 1,
    }).countDocuments();
    return res.status(200).json({
      success: response ? true : false,
      counts,
      limit,
      data: response ? response : "Get All Music Collection not found data",
      msg: response
        ? "Get All Music Collection successfully"
        : "Get All Music Collection not found",
    });
  });
});
const getAllSfxCollection = asyncHandler(async (req, res) => {
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
    formatedQueries.title = { $regex: queries.title, $options: "i" };
  }
  let queryCommand = Collection.find({
    ...formatedQueries,
    collection_type: 2,
  })
    .populate("album", "title _id slug")
    .populate("song", "title _id slug")
    .populate("sfx", "title _id slug");

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
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  queryCommand = queryCommand.skip(skip).limit(limit);
  if (req.query.page) {
    const counts = await Collection.find({
      ...formatedQueries,
      collection_type: 2,
    }).countDocuments();
    if (counts === 0)
      return res
        .status(200)
        .json({ msg: "Không có Sfx collection nào", success: true, data: [] });
    if (skip >= counts) throw new Error("This page does not exist");
  }
  queryCommand.exec(async (err, response) => {
    if (err) throw new Error(err.message);
    const counts = await Collection.find({
      ...formatedQueries,
      collection_type: 2,
    }).countDocuments();
    return res.status(200).json({
      success: response ? true : false,
      counts,
      limit,
      data: response ? response : "Collection not found",
      msg: response ? "Collection found successfully" : "Collection not found",
    });
  });
});
const getAllCollection = asyncHandler(async (req, res) => {
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
    formatedQueries.title = { $regex: queries.title, $options: "i" };
  }
  let queryCommand = Collection.find(formatedQueries)
    .populate("album", "title _id slug")
    .populate("song", "title _id slug")
    .populate("sfx", "title _id slug");

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
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || undefined;
  const skip = (page - 1) * limit;
  queryCommand = queryCommand.skip(skip).limit(limit);
  if (req.query.page) {
    const counts = await Collection.find(formatedQueries).countDocuments();
    if (counts === 0)
      return res
        .status(200)
        .json({ msg: "Không có collection nào", success: true, data: [] });
    if (skip >= counts) throw new Error("This page does not exist");
  }
  queryCommand.exec(async (err, response) => {
    if (err) throw new Error(err.message);
    const counts = await Collection.find(formatedQueries).countDocuments();
    return res.status(200).json({
      success: response ? true : false,
      counts,
      limit,
      skip,
      data: response ? response : "Collection not found",
      msg: response ? "Collection found successfully" : "Collection not found",
    });
  });
});
const getAllCollectionByGenre = asyncHandler(async (req, res) => {
  var { gid } = req.params;
  Genre.findOne({ _id: gid }, async (err, genre) => {
    if (err) throw new Error(err.message);
    if (!genre) throw new Error("Genre not found");
    const Collections = await Collection.find({ genres: gid })
      .populate("genres", "name _id slug")
      .populate("artists", "name _id slug")
      .populate("album", "title _id slug");
    return res.status(200).json({
      success: Collections ? true : false,
      data: Collections ? Collections : "Collection not found",
      msg: Collections
        ? "Collection foundssss successfully"
        : "Collection not ssfound",
    });
  });
});
const getAllCollectionByAlbumSlug = asyncHandler(async (req, res) => {
  var { slug } = req.params;

  Album.findOne({ slug: slug }, async (err, albums) => {
    if (err) throw new Error(err.message);
    if (!albums) throw new Error("Album not found");
    const counts = await Collection.find({
      album: albums._id,
    }).countDocuments();
    const Collections = await Collection.find({ album: albums._id })
      .populate("genres", "name _id slug")
      .populate("artists", "name _id slug")
      .populate("album", "title _id slug");
    return res.status(200).json({
      counts: counts,
      success: Collections ? true : false,
      data: Collections ? Collections : "Collection not found",
      msg: Collections
        ? "Collection foundssss successfully"
        : "Collection not ssfound",
    });
  });
});
const updateCollection = asyncHandler(async (req, res) => {
  const { collectionid } = req.params;
  if (req.body && req.body.title)
    req.body.slug = slugify(req.body.title).toLowerCase();

  const { slug } = req.body;
  const colSlug = await Collection.findOne({ slug });

  if (colSlug) {
    const tempCol = await Collection.find({ slug: { $regex: slug } });

    if (tempCol.length >= 1) {
      const tempSlug = tempCol.find(
        (item) => item._id.toString() === collectionid.toString()
      )?.slug;
      if (tempSlug) {
        req.body.slug = tempSlug;
      } else {
        const existSlug = tempCol?.map((item) => item.slug);
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

  const collection = await Collection.findByIdAndUpdate(
    collectionid,
    req.body,
    {
      new: true,
    }
  )
    .populate("album")
    .populate("song")
    .populate("sfx");

  await collection.save();

  return res.status(200).json({
    success: collection ? true : false,
    data: collection,
    msg: collection
      ? "Collection updated successfully"
      : "Collection updated failed",
  });
});
const deleteCollection = asyncHandler(async (req, res) => {
  const { collectionid } = req.params;
  const collection = await Collection.findByIdAndRemove(collectionid)
    .populate("album")
    .populate("song")
    .populate("sfx");
  return res.status(200).json({
    success: collection ? true : false,
    msg: collection
      ? "Collection deleted successfully"
      : "Collection deleted failed",
    dataDeleted: collection,
  });
});

const searchCollectionByTitle = asyncHandler(async (req, res) => {
  const { q } = req.params;
  if (!q) throw new Error("Missing inputs");
  const collections = await Collection.find({
    $text: { $search: q },
    status: true,
  })
    .populate("album", "title _id slug")
    .populate("song", "title _id slug")
    .populate("sfx", "title _id slug");
  const musicCollections = collections.filter(
    (collection) => collection.collection_type === 1
  );
  const sfxCollections = collections.filter(
    (collection) => collection.collection_type === 2
  );
  const datas = {
    musicCollections,
    sfxCollections,
  };

  return res.status(200).json({
    success: collections ? true : false,
    data: datas ? datas : "Collection not found",
    msg: collections ? "Collection found successfully" : "Collection not found",
  });
});
const countListen = asyncHandler(async (req, res) => {
  const { sid } = req.params;
  const collection = await Collection.findById(sid);
  collection.listen = collection.listen + 1;
  collection.views = collection.views + 1;
  await collection.save();
  return res.status(200).json({
    success: collection ? true : false,
    listen: collection?.listen,
    view: collection?.views,
    msg: collection ? "Listen count + 1" : "Listen count failed to update",
  });
});
module.exports = {
  createCollection,
  getCollection,
  getAllMusicCollection,
  getAllSfxCollection,
  getAllCollection,
  updateCollection,
  deleteCollection,
  getAllCollectionByGenre,
  getAllCollectionByAlbumSlug,
  searchCollectionByTitle,
  getCollectionbySlug,
  countListen,
};
