const router = require("express").Router();
const ctrls = require("../controllers/song");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");
// const uploadConfig = require('../middlewares/uploaders3');
const s3 = require("../middlewares/s3Handler");

router.post(
  "/",
  [verifyAccessToken, isAdmin],
  s3.uploadConfig.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "thumbnail_medium", maxCount: 1 },
    { name: "streaming", maxCount: 1 },
  ]),
  s3.uploadAndSetBody,
  s3.createTempFileAndGetDuration,
  ctrls.createSong
);
router.get("/", ctrls.getAllSong);
router.get("/filter/", ctrls.getAllSongByFilter);
router.get("/genre/:slug", ctrls.getSimilarSongByGenreSlug);
router.get("/genre/:gid", ctrls.getAllSongByGenre);
router.get("/album/:slug", ctrls.getAllSongByAlbumSlug);
router.get("/artist/:slug", ctrls.getAllSongByArtistSlug);
router.get("/artists/", ctrls.getAllSongByArtist);

router.put("/ratings", verifyAccessToken, ctrls.ratings);
router.get("/:sid", ctrls.getSong);
router.get("/slug/:slug", ctrls.getSongBySlug);
router.put(
  "/:sid",
  [verifyAccessToken, isAdmin],
  s3.uploadConfig.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "thumbnail_medium", maxCount: 1 },
    { name: "streaming", maxCount: 1 },
  ]),
  s3.uploadAndSetBody,
  s3.createTempFileAndGetDuration,
  ctrls.updateSong
);
router.put("/:sid/listen", ctrls.countListen);
router.put("/:sid/downloads", ctrls.countDownload);

router.delete("/:sid", [verifyAccessToken, isAdmin], ctrls.deleteSong);
router.get("/search/:q", ctrls.searchSongByTitle);
router.get("/allobject/song", ctrls.getAllObjectFromS3);
module.exports = router;

// CRUD - Create, Read, Update, Delete | POST, GET, PUT, DELETE
// Create - POST + PUT body
// GET + DELETE query ?var1=1&var2=2
