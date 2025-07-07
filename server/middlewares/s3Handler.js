const dotenv = require("dotenv");
const AWS = require("aws-sdk");
const multer = require("multer");
const asyncHandler = require("express-async-handler");
const fs = require("fs");
const ffprobe = require("ffprobe");
const ffprobeStatic = require("ffprobe-static");
const awsConfig = {
  accessKeyId: process.env.AccessKey,
  secretAccessKey: process.env.SecretKey,
  region: process.env.region,
};
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath(ffmpegPath);
const S3 = new AWS.S3(awsConfig);
const tmp = require("tmp");
const WaveformData = require("waveform-data");
const AudioContext = require("web-audio-api").AudioContext;
const utf8 = require("utf8");
const { default: slugify } = require("slugify");

const uploadtoS3 = async (fileData) => {
  const bucket = process.env.bucketName;
  var fileName = slugify(fileData.originalname.split(".")[0]).toLowerCase();
  var bucketName = "";

  if (
    fileData.fieldname == "thumbnail_medium" ||
    fileData.fieldname == "thumbnail" ||
    fileData.fieldname == "streaming"
  ) {
    bucketName = bucket.concat("/", "Song");
  }
  if (fileData.fieldname === "thumbnail_collection") {
    bucketName = bucket.concat("/", "Collection");
  }
  if (fileData.fieldname === "avatar") {
    bucketName = bucket.concat("/", "User");
  }
  if (fileData.fieldname === "cover") {
    bucketName = bucket.concat("/", "Artist");
  }
  if (
    fileData.fieldname == "album_art" ||
    fileData.fieldname == "album_cover"
  ) {
    bucketName = bucket.concat("/", "Album");
  }
  if (fileData.fieldname === "video_thumnail") {
    bucketName = bucket.concat("/", "SfxCategoryVideo");
  }
  if (fileData.fieldname === "themesArtwork") {
    bucketName = bucket.concat("/", "Themes");
  }
  if (fileData.fieldname === "themesubArtwork") {
    bucketName = bucket.concat("/", "Themes/ThemeSub");
  }
  if (fileData.fieldname === "blogCategory_thumbnail") {
    bucketName = bucket.concat("/", "BlogCategory");
  }

  if (fileData.fieldname === "blog_thumbnail") {
    bucketName = bucket.concat("/", "Blog");
  }
  if (fileData.fieldname === "meta_image") {
    bucketName = bucket.concat("/", "Ogimage");
  }

  //await check exist file name in bucket
  await checkFileName(fileName?.split(".")[0]).then((data) => {
    fileName = data?.trim() + "." + fileData.originalname.split(".").pop();
  });
  return new Promise((resolve, reject) => {
    const params = {
      Bucket: bucketName,
      Key: fileName,
      Body: fileData.buffer,
      StorageClass: "INTELLIGENT_TIERING",
      Metadata: {
        "Content-Type": fileData.mimetype,
      },
      // ACL: "public-read",

      // Metadata: {
      //   "Content-Type": fileData.mimetype,

      // },
      // StorageClass: "REDUCED_REDUNDANCY",
    };
    S3.upload(params, (err, data) => {
      // console.log(data);
      if (err) {
        return reject(err);
      }
      return resolve(data);
    });
  });
};
const uploadConfig = multer({
  // storage: multer.memoryStorage(),

  // limits: {
  // giới hạn file upload 100MB
  limits: {
    fileSize: 1024 * 1024 * 100,
  },

  fileFilter: function (req, file, done) {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jfif" ||
      file.mimetype === "image/gif" ||
      file.mimetype === "image/svg+xml" ||
      file.mimetype === "image/webp" ||
      file.mimetype === "image/bmp" ||
      file.mimetype === "image/tiff" ||
      file.mimetype === "image/vnd.microsoft.icon" ||
      file.mimetype === "image/vnd.wap.wbmp" ||
      file.mimetype === "image/x-icon" ||
      file.mimetype === "image/x-jng" ||
      file.mimetype === "image/x-ms-bmp" ||
      file.mimetype === "audio/mpeg" ||
      file.mimetype === "audio/ogg" ||
      file.mimetype === "audio/wav" ||
      file.mimetype === "audio/webm" ||
      file.mimetype === "audio/x-m4a" ||
      file.mimetype === "audio/x-matroska" ||
      file.mimetype === "audio/x-ms-wax" ||
      file.mimetype === "audio/x-ms-wma" ||
      file.mimetype === "audio/x-realaudio" ||
      file.mimetype === "video/3gpp" ||
      file.mimetype === "video/3gpp2" ||
      file.mimetype === "video/h261" ||
      file.mimetype === "audio/wave" ||
      file.mimetype === "audio/x-wav" ||
      file.mimetype === "video/h263" ||
      file.mimetype === "video/h264" ||
      file.mimetype === "video/jpeg" ||
      file.mimetype === "video/jpm" ||
      file.mimetype === "video/mj2" ||
      file.mimetype === "video/mp4" ||
      file.mimetype === "video/mpeg" ||
      file.mimetype === "video/ogg" ||
      file.mimetype === "video/quicktime" ||
      file.mimetype === "video/vnd.dece.hd" ||
      file.mimetype === "video/vnd.dece.mobile"
    ) {
      //accept the upload

      done(null, true);
    } else {
      //prevent the upload
      var newError = new Error("File type is incorrect");
      newError.name = "MulterError";
      done(newError, false);
    }
  },
});
const uploadAndSetBody = asyncHandler(async (req, res, next) => {
  if (req?.files) {
    if (req?.files["thumbnail_medium"])
      await uploadtoS3(req.files["thumbnail_medium"][0]).then((result) => {
        req.body.thumbnail_medium = result.Location;
      });
    if (req?.files["thumbnail"])
      await uploadtoS3(req.files["thumbnail"][0]).then((result) => {
        req.body.thumbnail = result.Location;
      });
    if (req?.files["streaming"]) {
      await uploadtoS3(req.files["streaming"][0]).then((result) => {
        req.body.streaming = result.Location;
      });
    }

    if (req?.files["video_thumnail"])
      await uploadtoS3(req.files["video_thumnail"][0]).then((result) => {
        req.body.video_thumnail = result.Location;
      });
    if (req?.files["thumbnail_collection"])
      await uploadtoS3(req.files["thumbnail_collection"][0]).then((result) => {
        req.body.thumbnail_collection = result.Location;
      });
    if (req?.files["avatar"])
      await uploadtoS3(req.files["avatar"][0]).then((result) => {
        req.body.avatar = result.Location;
      });
    if (req?.files["cover"])
      await uploadtoS3(req.files["cover"][0]).then((result) => {
        req.body.cover = result.Location;
      });
    if (req?.files["album_art"])
      await uploadtoS3(req.files["album_art"][0]).then((result) => {
        req.body.album_art = result.Location;
      });
    if (req?.files["album_cover"])
      await uploadtoS3(req.files["album_cover"][0]).then((result) => {
        req.body.album_cover = result.Location;
      });
    if (req?.files["themesArtwork"])
      await uploadtoS3(req.files["themesArtwork"][0]).then((result) => {
        req.body.themesArtwork = result.Location;
      });
    if (req?.files["themesubArtwork"])
      await uploadtoS3(req.files["themesubArtwork"][0]).then((result) => {
        req.body.themesubArtwork = result.Location;
      });

    if (req?.files["blogCategory_thumbnail"])
      await uploadtoS3(req.files["blogCategory_thumbnail"][0]).then(
        (result) => {
          req.body.blogCategory_thumbnail = result.Location;
        }
      );

    if (req?.files["blog_thumbnail"])
      await uploadtoS3(req.files["blog_thumbnail"][0]).then((result) => {
        req.body.blog_thumbnail = result.Location;
      });
    if (req?.files["meta_image"])
      await uploadtoS3(req.files["meta_image"][0]).then((result) => {
        req.body.meta_image = result.Location;
      });
  }

  next();
});
const createTempFileAndGetDuration = asyncHandler(async (req, res, next) => {
  if (req?.files) {
    if (req?.files["streaming"]) {
      // add file to tmp folder
      const file = req?.files["streaming"][0];
      const tmpobj = tmp.fileSync();
      const filePng = tmp.fileSync({ postfix: ".png" });
      // get duration
      fs.writeFileSync(tmpobj.name, file.buffer);
      ffprobe(tmpobj.name, { path: ffprobeStatic.path }, (err, info) => {
        if (err) console.log(err);
        else {
          // console.log(info.streams[0])
          req.body.duration = Math.round(info.streams[0].duration);
          //calculate tempo of audio
          // const tempo = Math.round(info.streams[0].tags.TBPM);
        }
      });
      await createTempFileAndCreateWaveForm(file, tmpobj, filePng).then(
        (result) => {
          req.body.waveform = result.Location;
          tmpobj.removeCallback();
          filePng.removeCallback();
        }
      );
    }
  }
  next();
});
const createTempFileAndCreateWaveForm = async (file, tmpobj, filePng) => {
  var fileName = utf8.decode(file.originalname.split(".")[0]);
  await checkFileName(fileName).then((data) => {
    fileName = data.concat(".png");
  });

  return new Promise((resolve, reject) => {
    const ffmpegfile = new ffmpeg({
      source: tmpobj.name,
    });

    ffmpegfile
      .complexFilter(
        [
          `[0:a]aformat=channel_layouts=mono,compand=gain=-6,showwavespic=s=1400x100:colors=#1faf16[waveform]`,
        ],
        ["waveform"]
      )
      .outputOptions(["-vframes 1"])
      .on("start", () => {
        // console.log('FFMPEG started with command:');
      })
      .on("progress", (progress) => {
        // console.log('Processing: ' + progress + '% done');
      })
      .on("error", (error) => {
        return reject(new Error(err));
      })
      .on("end", () => {
        const requestBodyFile = fs.readFileSync(
          filePng.name.replace(/\\/g, "/")
        );

        const params = {
          Bucket: process.env.bucketName.concat("/", "WaveForm"),
          Key: fileName,
          Body: requestBodyFile,
          StorageClass: "INTELLIGENT_TIERING",
          Metadata: {
            "Content-Type": "image/png",
          },
        };
        S3.upload(params, (err, data) => {
          if (err) {
            return reject(err);
          }
          return resolve(data);
        });

        //   const fileUpload = {
        //     fieldname: "waveform",
        //     originalname: file.originalname.slice(0, -4).concat(".png"),
        //     buffer: requestBodyFile,
        //     mimetype: "image/png",
        //   };
        //   req.files["waveform"] = [fileUpload];
        //   uploadtoS3(req.files["waveform"][0]).then((result) => {
        //     console.log(result.Location);
        //     req.body.waveform = result.Location;
        //     // tmpobj.removeCallback();
        //     // filePng.removeCallback();
        //     next();
        //   });

        // const fileUpload = {
        //   fieldname: "waveform",
        //   originalname: file.originalname.slice(0, -4).concat(".png"),
        //   buffer: requestBodyFile,
        //   mimetype: "image/png",
        // };
        // req.files["waveform"] = [fileUpload];
        // uploadtoS3(req.files["waveform"][0]).then((result) => {
        //   console.log(result.Location);
        //   req.body.waveform = result.Location;
        //   // tmpobj.removeCallback();
        //   // filePng.removeCallback();
        //   // next();
        // });
      });
    ffmpegfile.saveToFile(filePng.name);
  });

  //get buffer from filePng

  // return new Promise((resolve, reject) => {
  //   const params = {
  //     Bucket: process.env.bucketName.concat("/", "Song"),
  //     Key: req?.files["streaming"][0].originalname.concat(".png"),
  //     Body: requestBodyFile,
  //     StorageClass: "INTELLIGENT_TIERING",
  //     Metadata: {
  //       "Content-Type": "image/png",
  //     },
  //   };
  //   S3.upload(params, (err, data) => {
  //     if (err) console.log(err);
  //     else {
  //       req.body.waveform = data.Location;
  //       tmpobj.removeCallback();
  //       filePng.removeCallback();
  //     }
  //   });
  // });
  // await uploadtoS3(filePng).then((result) => {
  //   req.body.waveform = result.Location;
  // });
  // console.log(ffmpegfile);

  // console.log(ffmpegfile.saveToFile("waveform.png"));
  // await  uploadtoS3(ffmpegfile).then((result) => {
  //   console.log(result);
  //   req.body.waveform = result.Location;
  // });
  // const audioBuffer = fs.readFileSync(tmpobj.name);
  // const waveform = await WaveformData.createFromAudio;
  // upload to s3
};

const checkFileName = async (fileName) => {
  return new Promise((resolve, reject) => {
    S3.listObjectsV2({ Bucket: process.env.bucketName }, function (err, data) {
      if (err) console.log(err, err.stack);
      else {
        const listFileName = data.Contents.map((el) => {
          return {
            filename: el.Key.split("/")[1]?.split(".")[0],
          };
        });
        const checkFileName = listFileName.filter((el) => {
          return el?.filename?.includes(fileName);
        });
        if (checkFileName) {
          var key = fileName + "-" + checkFileName?.length;
          resolve(key);
        } else resolve(fileName);
      }
    });
  });
};

module.exports = {
  uploadtoS3,
  uploadConfig,
  uploadAndSetBody,
  createTempFileAndGetDuration,
  createTempFileAndCreateWaveForm,
};
// module.exports = uploadConfig;
