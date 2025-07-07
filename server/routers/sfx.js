const router = require("express").Router();
const ctrls = require("../controllers/sfx");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");
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
  ctrls.createSfx
);
router.get("/", ctrls.getAllSfx);
router.get("/:sfxid", ctrls.getSfx);
router.get ('/slug/:slug',ctrls.getSfxBySlug);
router.get("/artist/:slug", ctrls.getAllSfxByArtistSlug);
router.get("/sfxCategory/:slug", ctrls.getSimilarSfxByGenreSlug);
router.get("/categories/:slug", ctrls.getAllSfxByCategorySlug);

router.put(
  "/:sfxid",
  [verifyAccessToken, isAdmin],
  s3.uploadConfig.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "thumbnail_medium", maxCount: 1 },
    { name: "streaming", maxCount: 1 },
  ]),
  s3.uploadAndSetBody,
  s3.createTempFileAndGetDuration,
  ctrls.updateSfx
);
router.put("/:sid/listen", ctrls.countListen);
router.put("/:sid/downloads", ctrls.countDownload);
router.delete("/:sfxid", [verifyAccessToken, isAdmin], ctrls.deleteSfx);
router.put("/like/:sfxid", [verifyAccessToken], ctrls.likeSfx);
router.put("/dislike/:sfxid", [verifyAccessToken], ctrls.dislikeSfx);
router.get("/search/:q", ctrls.searchSfxByTitle);
module.exports = router;

// CRUD - Create, Read, Update, Delete | POST, GET, PUT, DELETE
// Create - POST + PUT body
// GET + DELETE query ?var1=1&var2=2
