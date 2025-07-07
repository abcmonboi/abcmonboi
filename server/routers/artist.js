const router = require("express").Router();
const ctrls = require("../controllers/artist");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");
const s3 = require("../middlewares/s3Handler");

router.post(
  "/",
  [verifyAccessToken, isAdmin],
  s3.uploadConfig.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "cover", maxCount: 1 },
  ]),
  s3.uploadAndSetBody,
  ctrls.createArtist
);
router.get("/", ctrls.getAllArtists);
router.get("/:arid", ctrls.getArtistById);
router.get("/slug/:slug", ctrls.getArtistBySlug);
router.put(
  "/:arid",
  [verifyAccessToken, isAdmin],
  s3.uploadConfig.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "cover", maxCount: 1 },
  ]),
  s3.uploadAndSetBody,
  ctrls.updateArtist
);
router.delete("/:arid", [verifyAccessToken, isAdmin], ctrls.deleteArtist);
router.get("/search/:q", ctrls.searchArtistByTitle);

module.exports = router;

// CRUD - Create, Read, Update, Delete | POST, GET, PUT, DELETE
// Create - POST + PUT body
// GET + DELETE query ?var1=1&var2=2
