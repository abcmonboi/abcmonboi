const router = require("express").Router();
const ctrls = require("../controllers/sfxCategory");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");
const s3 = require("../middlewares/s3Handler");

router.post("/", [verifyAccessToken, isAdmin],
s3.uploadConfig.fields([
    { name: "video_thumnail", maxCount: 1 },
  ]),
  s3.uploadAndSetBody,
   ctrls.createSfxCategory);
router.get("/", ctrls.getAllSfxCategorys);
router.get("/:SfxCateID", ctrls.getSfxCategoryById);
router.get ('/slug/:slug',ctrls.getSfxCategoryBySlug);
router.put(
  "/:SfxCateID",
  [verifyAccessToken, isAdmin],
  s3.uploadConfig.fields([
    { name: "video_thumnail", maxCount: 1 },
  ]),
  s3.uploadAndSetBody,
  ctrls.updateSfxCategory
);
router.delete(
  "/:SfxCateID",
  [verifyAccessToken, isAdmin],
  ctrls.deleteSfxCategory
);

module.exports = router;

// CRUD - Create, Read, Update, Delete | POST, GET, PUT, DELETE
// Create - POST + PUT body
// GET + DELETE query ?var1=1&var2=2
