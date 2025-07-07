const Song = require("../models/song");
const Genre = require("../models/genre");
const Album = require("../models/album");
const Artist = require("../models/artist");
const License = require("../models/license");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const { response } = require("express");
const utf8 = require("utf8");
const { parse } = require("dotenv");
const { ObjectId } = require("mongodb");
const AWS = require("aws-sdk");
const awsConfig = {
  accessKeyId: process.env.AccessKey,
  secretAccessKey: process.env.SecretKey,
  region: process.env.region,
};
const S3 = new AWS.S3(awsConfig);

const createSong = asyncHandler(async (req, res) => {
  if (Object.keys(req.body).length === 0) throw new Error("Missing inputs");
  if (req.body && req.body.title)
    req.body.slug = slugify(req.body.title).toLowerCase();
  const { slug } = req.body;
  const song = await Song.findOne({ slug });

  if (song) {
    const tempSong1 = await Song.find({ slug: { $regex: slug } });
    const existSlug = tempSong1?.map((item) => item.slug);

    const existSlugLength = existSlug?.length;
    if (existSlugLength > 0) {
      req.body.slug = `${slug}(${existSlugLength})`;
    } else {
      req.body.slug = `${slug}(1)`;
    }
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
  // req.body.slug = slugify(req.body.title) + "-" + Date.now().toString();
  if (req.body.thumbnail) {
    if (!req.body.thumbnail_medium) {
      req.body.thumbnail_medium = req.body.thumbnail;
    }
  }
  const newSong = await Song.create(req.body);

  // }
  return res.status(200).json({
    success: newSong ? true : false,
    data: newSong ? newSong : "Something went wrong",
    msg: newSong ? "Song created successfully" : "Song created failed",
  });
});
const getSong = asyncHandler(async (req, res) => {
  // get id from request query params
  const { sid } = req.params;
  const song = await Song.findById(sid)
    .populate("genres", "name _id slug")
    .populate("artists", "name _id slug")
    .populate("album", "title _id slug")
    .populate("moods")
    .populate("instruments", "name _id slug")
    .populate("videothemes", "name _id slug")
    .populate("license", "title _id slug description");
  // console.log(song.slug.slice(-2,-1))
  return res.status(200).json({
    success: song ? true : false,
    data: song ? song : "Song not found",
    msg: song ? "Song found successfully" : "Song not found",
  });
});
const getSongBySlug = asyncHandler(async (req, res) => {
  // get id from request query params
  const { slug } = req.params;
  const song = await Song.findOne({ slug })
    .populate("genres")
    .populate("artists")
    .populate("album")
    .populate("moods")
    .populate("instruments", "name _id slug")
    .populate("videothemes", "name _id slug")
    .populate("license", "title _id slug description");

  if (
    !song ||
    song === null ||
    song === undefined ||
    song === "" ||
    song.length === 0
  ) {
    throw new Error("Song not found");
  } else {
    song.views = song.views + 1;
    await song.save();
    return res.status(200).json({
      msg: song ? "Get Song successfully" : "Get Song failed",
      success: song ? true : false,
      data: song,
    });
  }
});
// Filtering, Sorting, Pagination, Field Limiting
const getAllSong = asyncHandler(async (req, res) => {
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
    formatedQueries.title = {
      $regex: queries.title,
      $options: "i",
    };
  }
  if (queries?.genres) {
    formatedQueries.genres = { $in: queries.genres.split(",") };
  }
  if (queries?.moods) {
    formatedQueries.moods = { $in: queries.moods.split(",") };
  }
  if (queries?.instruments) {
    formatedQueries.instruments = { $in: queries.instruments.split(",") };
  }
  if (queries?.videothemes) {
    formatedQueries.videothemes = { $in: queries.videothemes.split(",") };
  }
  // if (queries?.duration) {
  //   // formatedQueries.duration = { $gt :  queries.duration.split(",")[0] , $lt : queries.duration.split(",")[1] };
  //   formatedQueries.duration = { $gt :  queries?.duration};

  // }
  // queryCommand = await Song.find(
  //   {
  //   $text: { $search: '"' + queries?.title + '"' },
  //   // ...formatedQueries,

  //   //  genres : queries?.genres ? formatedQueries.genres : null,
  // },

  // )
  let queryCommand = Song.find(formatedQueries)
    // ...formatedQueries,

    .populate("genres", "name _id slug")
    .populate("artists", "name _id slug")
    .populate("album", "title _id slug")
    .populate("moods", "name _id slug")
    .populate("instruments", "name _id slug")
    .populate("videothemes", "name _id slug")
    .populate("license", "title _id slug description");


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
  const limit = parseInt(req.query.limit) || undefined;
  const skip = (page - 1) * limit;
  queryCommand = queryCommand.skip(skip).limit(limit);
  if (req.query.page) {
    const counts = await Song.find(formatedQueries).countDocuments();
    if (counts === 0)
      return res
        .status(200)
        .json({ msg: "Không có bài hát", success: true, data: [] });
    if (skip >= counts) throw new Error("This page does not exist");
  }
  // return res.status(200).json({
  //   success: queryCommand ? true : false,
  //   data: queryCommand ? queryCommand : "Song not found",
  //   msg: queryCommand ? "Song found successfully" : "Song not found",
  // });

  queryCommand.exec(async (err, response) => {
    if (err) throw new Error(err.message);
    const counts = await Song.find(formatedQueries).countDocuments();
    return res.status(200).json({
      success: response ? true : false,
      counts,
      limit,
      skip,
      data: response ? response : "Song not found",
      msg: response ? "Song found successfully" : "Song not found",
    });
  });
});
const getAllSongByFilter = asyncHandler(async (req, res) => {
  const queries = { ...req.query };
  const excludedFields = ["sort", "page", "limit", "fields"];
  excludedFields.forEach((el) => delete queries[el]);

  let queryString = JSON.stringify(queries);
  queryString = queryString.replace(
    /\b(gte|gt|lte|lt)\b/g,
    (match) => `$${match}`
  );
  const formatedQueries = JSON.parse(queryString);
  let moodQueryObject = {};
  if (queries?.title) {
    delete formatedQueries.title;
    formatedQueries.$text = { $search: `\`"${queries.title}"\`` };
    // formatedQueries.$text = { $search: `${queries.title}` };
    // formatedQueries.$score = { $meta: "textScore" };
  }
  let artistsQueryObject = {};
  if (queries?.artists) {
    delete formatedQueries.artists;

    const artist = await Artist.find({
      $text: { $search: queries.artists },
    });

    const artistQuery = artist.map((el) => ({
      artists: el._id,
    }));
    artistsQueryObject = { $or: artistQuery };
    // $or: artistQuery };
  }
  if (queries?.artist) {
    delete formatedQueries.artist;
    formatedQueries.artists = queries?.artist

    
  }

  if (queries?.moods) {
    delete formatedQueries.moods;
    const moodsArray = queries.moods?.split(",");
    const moodQuery = moodsArray.map((el) => ({
      moods: ObjectId(el),
    }));
    // moodQueryObject = { $or: moodQuery };
    // console.log(moodQuery);

    formatedQueries.moods = { $in: queries.moods.split(",") };
    // artistsQueryObject = {...artistsQueryObject, $or: moodQuery}
    // formatedQueries.moods = { $or: moodQuery,};
    // formatedQueries.moods = { $or: [
    //   { moods: "646a185956fd892c2b84d0de" },
    //    { moods : "646a183156fd892c2b84d0ba" } ,
    //   ] };
    //   formatedQueries.moods =  [
    //   "646a185956fd892c2b84d0de",
    //     // "646a183156fd892c2b84d0ba"
    //     ] ;
  }
  if (queries?.videothemes) {
    delete formatedQueries.videothemes;
    const videothemesArray = queries.videothemes?.split(",");
    const videothemesQuery = videothemesArray.map((el) => ({
      videothemes: el,
    }));
    // moodQueryObject = {  ...moodQueryObject, $or: videothemesQuery };
    formatedQueries.videothemes = { $in: queries.videothemes.split(",") };
  }
  if (queries?.genres) {
    delete formatedQueries.genres;
    const genresArray = queries.genres?.split(",");
    const genresQuery = genresArray.map((el) => ({
      genres: el,
    }));
    // moodQueryObject = {  ...moodQueryObject, $or: genresQuery };
    formatedQueries.genres = { $in: queries.genres.split(",") };
  }
  if (queries?.instruments) {
    delete formatedQueries.instruments;
    const instrumentsArray = queries.instruments?.split(",");
    const instrumentsQuery = instrumentsArray.map((el) => ({
      instruments: el,
    }));
    // moodQueryObject = {  ...moodQueryObject, $or: instrumentsQuery };
    formatedQueries.instruments = { $in: queries.instruments.split(",") };
  }

  // if (queries?.instruments) {
  //   formatedQueries.instruments = { $in: queries.instruments.split(",") };
  // }
  // if (queries?.videothemes) {
  //   formatedQueries.videothemes = { $in: queries.videothemes.split(",") };
  // }
  const q = { ...formatedQueries, ...moodQueryObject, ...artistsQueryObject };
  // console.log(formatedQueries);

  // let queryCommand = Song.find(q,{score: { $meta: "textScore" }} )
  let queryCommand = Song.find(q)
    // ...formatedQueries,

    .populate("genres", "name _id slug")
    .populate("artists", "name _id slug")
    .populate("album", "title _id slug")
    .populate("moods", "name _id slug")
    .populate("instruments", "name _id slug")
    .populate("videothemes", "name _id slug")
    .populate("license", "title _id slug description");


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
  const limit = parseInt(req.query.limit) || 12;
  const skip = (page - 1) * limit;
  queryCommand = queryCommand.skip(skip).limit(limit);
  if (req.query.page) {
    const counts = await Song.find(q).countDocuments();
    if (counts === 0)
      return res
        .status(200)
        .json({ msg: "Không có bài hát", success: true, data: [] });
    if (skip >= counts) throw new Error("This page does not exist");
  }

  queryCommand.exec(async (err, response) => {
    if (err) throw new Error(err.message);
    const counts = await Song.find(q).countDocuments();
    return res.status(200).json({
      success: response ? true : false,
      counts,
      limit,
      skip,
      data: response ? response : "Song not found",
      msg: response ? "Song found successfully" : "Song not found",
    });
  });
});
const getSimilarSongByGenreSlug = asyncHandler(async (req, res) => {
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
  let queryCommand = Song.find(formatedQueries)
    .populate("genres")
    .populate("artists")
    .populate("album")
    .populate("moods", "name _id slug")
    .populate("instruments", "name _id slug")
    .populate("videothemes", "name _id slug")
    .populate("license", "title _id slug description");


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
    const counts = await Song.find(formatedQueries).countDocuments();
    if (counts === 0) return res.status(200).json({ msg: "Không có bài hát" });
    if (skip >= counts) throw new Error("This page does not exist");
  }

  // Execute query
  // Số lượng bài hát thỏa mãn điều kiện !== số lượng sp trả về 1 lần gọi API
  queryCommand.exec(async (err, response) => {
    if (err) throw new Error(err.message);
    response = response.filter((song) => {
      return song.genres.some((genre) => genre.slug === slug);
    });
    response = response.filter((song) => song.status === true).slice(0, 4);
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
const getAllSongByGenre = asyncHandler(async (req, res) => {
  var { gid } = req.params;
  Genre.findOne({ _id: gid }, async (err, genre) => {
    if (err) throw new Error(err.message);
    if (!genre) throw new Error("Genre not found");
    const songs = await Song.find({ genres: gid, status: true })
      .populate("genres", "name _id slug")
      .populate("artists", "name _id slug")
      .populate("album", "title _id slug")
      .populate("moods", "name _id slug")
      .populate("instruments", "name _id slug")
      .populate("videothemes", "name _id slug")
    .populate("license", "title _id slug description");


    return res.status(200).json({
      success: songs ? true : false,
      data: songs ? songs : "Song not found",
      msg: songs ? "Song foundssss successfully" : "Song not ssfound",
    });
  });
});
const getAllSongByArtistSlug = asyncHandler(async (req, res) => {
  var { slug } = req.params;
  Artist.findOne({ slug: slug }, async (err, artist) => {
    if (err) throw new Error(err.message);
    if (!artist) throw new Error("Artist not found");
    const songs = await Song.find({ artists: artist._id, status: true })
      .populate("genres", "name _id slug")
      .populate("artists", "name _id slug")
      .populate("album", "title _id slug")
      .populate("moods", "name _id slug")
      .populate("instruments", "name _id slug")
      .populate("videothemes", "name _id slug")
    .populate("license", "title _id slug description");


    return res.status(200).json({
      success: songs ? true : false,
      data: songs ? songs : "Get all song by artist slug failed",
      msg: songs
        ? "Get all song by artist slug successfully"
        : "Get all song by artist slug failed",
    });
  });
});
const getAllSongByArtist = asyncHandler(async (req, res) => {
  const queries = { ...req.query };
  Artist.findOne({ slug: queries?.slug }, async (err, artist) => {
    if (err) throw new Error(err.message);
    if (!artist) throw new Error("Artist not found");
    const excludedFields = ["sort", "page", "limit", "fields"];
    excludedFields.forEach((el) => delete queries[el]);

    // Format lại các operator cho đúng cú pháp của mongoose
    let queryString = JSON.stringify(queries);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );
    const formatedQueries = JSON.parse(queryString);
    if (queries?.slug) {
      delete formatedQueries.slug;
      formatedQueries.artists = artist._id;
    }
    let queryCommand = Song.find(formatedQueries)
      .populate("genres", "name _id slug")
      .populate("artists", "name _id slug")
      .populate("album", "title _id slug")
      .populate("moods", "name _id slug")
      .populate("instruments", "name _id slug")
      .populate("videothemes", "name _id slug")
    .populate("license", "title _id slug description");


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
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;
    queryCommand = queryCommand.skip(skip).limit(limit);
    if (req.query.page) {
      const counts = await Song.find(formatedQueries).countDocuments();
      if (counts === 0)
        return res
          .status(200)
          .json({ msg: "Không có bài hát", success: true, data: [] });
      if (skip >= counts) throw new Error("This page does not exist");
    }
    queryCommand.exec(async (err, response) => {
      if (err) throw new Error(err.message);
      const counts = await Song.find(formatedQueries).countDocuments();
      return res.status(200).json({
        success: response ? true : false,
        counts,
        limit,
        skip,
        data: response ? response : "Song not found",
        msg: response ? "Song found successfully" : "Song not found",
      });
    });
  });
  // Tách các trường đặc biệt ra khỏi query

  /**
   * {quantity }
   */
  //Filtering một từ trong tên có chứa từ khóa, lọc theo trường nào và ko lấy trường nào

  // Sorting
  // abc,efg => [abc,efg]

  // // Fields limiting

  // Pagination
  // limit: số object trả về 1 lần gọi API
  // skip = (page - 1) * limit => số object bỏ qua
  // 1 2 3 .... 10
  // const page = parseInt(req.query.page) || 1;
  // const limit = parseInt(req.query.limit) || process.env.LIMIT_SfxS;
  // const skip = (page - 1) * limit;
  // queryCommand = queryCommand.skip(skip).limit(limit);
  // if (req.query.page) {
  //   const counts = await Sfx.find(formatedQueries).countDocuments();
  //   if (counts === 0) return res.status(200).json({ msg: "Không có hiệu ứng âm thanh nào", success: true, data: [] });
  //   if (skip >= counts) throw new Error("This page does not exist");
  // }

  // Execute query
  // Số lượng bài hát thỏa mãn điều kiện !== số lượng sp trả về 1 lần gọi API
  // queryCommand.exec(async (err, response) => {
  //   if (err) throw new Error(err.message);
  //   const counts = await Sfx.find(formatedQueries).countDocuments();
  //   return res.status(200).json({
  //     success: response ? true : false,
  //     counts,
  //     limit,
  //     data: response ? response : "Sfx not found",
  //     msg: response ? "Sfx found successfully" : "Sfx not found",
  //   });
  // });
});
const getAllSongByAlbumSlug = asyncHandler(async (req, res) => {
  var { slug } = req.params;

  Album.findOne({ slug: slug }, async (err, albums) => {
    if (err) throw new Error(err.message);
    if (!albums) throw new Error("Album not found");
    const counts = await Song.find({ album: albums._id }).countDocuments();
    const songs = await Song.find({ album: albums._id, status: true })
      .populate("genres", "name _id slug")
      .populate("artists", "name _id slug")
      .populate("album", "title _id slug")
      .populate("moods", "name _id slug")
      .populate("instruments", "name _id slug")
      .populate("videothemes", "name _id slug")
    .populate("license", "title _id slug description");


    return res.status(200).json({
      counts: counts,
      success: songs ? true : false,
      data: songs ? songs : "Song not found",
      msg: songs ? "Song foundssss successfully" : "Song not ssfound",
    });
  });
});

const updateSong = asyncHandler(async (req, res) => {
  const { sid } = req.params;
  const currentSong = await Song.findById(sid);

  if (req.body && req.body.title)
    req.body.slug = slugify(req.body.title).toLowerCase();
  const { slug } = req.body;
  const songSlug = await Song.findOne({ slug });

  if (songSlug) {
    const tempSong = await Song.find({ slug: { $regex: slug } });

    if (tempSong.length >= 1) {
      const tempSlug = tempSong.find(
        (song) => song._id.toString() === sid.toString()
      )?.slug;
      if (tempSlug) {
        req.body.slug = tempSlug;
      } else {
        const existSlug = tempSong?.map((song) => song.slug);
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
    // const existSlug = tempSong?.map((song) => song.slug);
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

  if (!req.body.thumbnail_medium) {
    req.body.thumbnail_medium = currentSong.thumbnail;
    // req.body.album_cover = Album.findByIdAndUpdate(aid).album_art;
  }
  const song = await Song.findByIdAndUpdate(sid, req.body, { new: true });
  await song.save();
  //generate waveform image from audio file

  // song.waveform = waveform;
  // await song.save();

  return res.status(200).json({
    success: song ? true : false,
    data: song,
    msg: song ? "Song updated successfully" : "Song updated failed",
  });
});
const deleteSong = asyncHandler(async (req, res) => {
  const { sid } = req.params;
  const song = await Song.findByIdAndRemove(sid);
  return res.status(200).json({
    success: song ? true : false,
    msg: song ? "Song deleted successfully" : "Song deleted failed",
    dataDeleted: song,
  });
});
const ratings = asyncHandler(async (req, res) => {
  const { uid } = req.user;
  const { star, pid, comment } = req.body;
  if (!pid || !star) throw new Error("Missing inputs");
  const ratingSong = await Song.findById(pid);
  const alreadyRating = ratingSong?.ratings?.find((el) => el.postedBy == uid);
  if (alreadyRating) {
    //update star & comment
    await Song.updateOne(
      {
        ratings: { $elemMatch: alreadyRating },
      },
      {
        $set: {
          "ratings.$.star": star,
          "ratings.$.comment": comment,
          "ratings.$.postedBy": uid,
        },
      },
      {
        new: true,
      }
    );
  } else {
    //create new rating
    const response = await Song.findByIdAndUpdate(
      pid,
      {
        $push: { ratings: { star, comment, postedBy: uid } },
      },
      { new: true }
    );
  }
  // Sum ratings
  const updatedSong = await Song.findById(pid);
  const ratingCount = updatedSong.ratings.length;
  const sumRatings = updatedSong.ratings.reduce((sum, el) => {
    return sum + +el.star;
  }, 0);
  updatedSong.totalRatings = Math.round((sumRatings * 10) / ratingCount) / 10;

  await updatedSong.save();
  return res.status(200).json({
    status: updatedSong ? true : false,
    data: updatedSong,
  });
});

const searchSongByTitle = asyncHandler(async (req, res) => {
  const { q } = req.params;
  // let titleSearch = removeVietnameseTones(q);
  if (!q) throw new Error("Missing inputs");
  const songs = await Song.find({
    $text: { $search: '" ' + q + '"' },
    status: true,
  })
    // const songs = await Song.find({
    //   $or: [
    //     { title: { $regex: q, $options: "i" } },
    //     { slug: { $regex: q, $options: "i" } },
    //   ],
    //   status: true,
    // })
    .populate("genres", "name _id slug")
    .populate("artists", "name _id slug")
    .populate("album", "title _id slug")
    .populate("moods", "name _id slug")
    .populate("instruments", "name _id slug")
    .populate("videothemes", "name _id slug");

  return res.status(200).json({
    success: songs ? true : false,
    data: songs ? songs : "Song not found",
    msg: songs ? "Song found successfully" : "Song not found",
  });
});
const countListen = asyncHandler(async (req, res) => {
  const { sid } = req.params;
  const song = await Song.findById(sid);
  song.listen = song.listen + 1;
  song.views = song.views + 1;
  await song.save();
  return res.status(200).json({
    success: song ? true : false,
    listen: song?.listen,
    view: song?.views,
    msg: song ? "Listen count + 1" : "Listen count failed to update",
  });
});
const countDownload = asyncHandler(async (req, res) => {
  const { sid } = req.params;
  const song = await Song.findById(sid);
  song.downloads = song.downloads + 1;
  await song.save();
  return res.status(200).json({
    success: song ? true : false,
    downloads: song?.downloads,
    msg: song ? "Downloads + 1" : "Downloads to update",
  });
});
const getAllObjectFromS3 = asyncHandler(async (req, res) => {
  var params = {
    Bucket: process.env.bucketName,
    // Delimiter: "/",
    // Prefix: "Song/",
  };
  S3.listObjectsV2(params, function (err, data) {
    if (err) console.log(err, err.stack);
    else {
      const content = data.Contents.map((el) => {
        return {
          filename: el.Key.split("/")[1],
        };
      });

      return res.status(200).json({
        success: true,
        data: content,
      });
    }
  });
});

module.exports = {
  createSong,
  getSong,
  getAllSong,
  updateSong,
  deleteSong,
  ratings,
  getAllSongByGenre,
  getAllSongByAlbumSlug,
  searchSongByTitle,
  getAllSongByArtistSlug,
  getSongBySlug,
  countListen,
  countDownload,
  getSimilarSongByGenreSlug,
  getAllSongByFilter,
  getAllSongByArtist,
  getAllObjectFromS3,
};
