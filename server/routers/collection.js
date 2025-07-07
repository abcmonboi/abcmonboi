const router = require("express").Router();
const ctrls = require("../controllers/collection");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");
const s3 = require("../middlewares/s3Handler");

router.post(
  "/",
  [verifyAccessToken, isAdmin],
  s3.uploadConfig.fields([
    { name: "thumbnail_collection", maxCount: 1 },
  ]),
  s3.uploadAndSetBody,
  ctrls.createCollection
);
router.get("/music", ctrls.getAllMusicCollection);
router.get("/sfx", ctrls.getAllSfxCollection);
router.get("/", ctrls.getAllCollection);
router.get("/:collectionid", ctrls.getCollection);
router.put(
    "/:collectionid",
    [verifyAccessToken, isAdmin],
    s3.uploadConfig.fields([
      { name: "thumbnail_collection", maxCount: 1 },
    ]),
    s3.uploadAndSetBody,
    ctrls.updateCollection
  );
router.delete("/:collectionid", [verifyAccessToken, isAdmin], ctrls.deleteCollection);
router.get ('/search/:q',ctrls.searchCollectionByTitle);
router.get ('/slug/:slug',ctrls.getCollectionbySlug);
router.put("/:sid/listen", ctrls.countListen);

module.exports = router;

// CRUD - Create, Read, Update, Delete | POST, GET, PUT, DELETE
// Create - POST + PUT body
// GET + DELETE query ?var1=1&var2=2
