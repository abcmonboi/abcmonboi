const router = require("express").Router();
const ctrls = require("../controllers/metaTag");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");
const s3 = require("../middlewares/s3Handler");
router.post(
  "/",
  //handle mongoose error
  [verifyAccessToken, isAdmin],
  s3.uploadConfig.fields([{ name: "meta_image", maxCount: 1 }]),
  s3.uploadAndSetBody,
  ctrls.createMetaTag
);
// router.get("/:bid", ctrls.getBlog);
// router.get("/slug/:slug", ctrls.getBlogBySlug);
// router.get("/", ctrls.getAllBlog);
// router.put(
//   "/:bid",
//   [verifyAccessToken, isAdmin],
//   s3.uploadConfig.fields([{ name: "meta_image", maxCount: 1 }]),
//   s3.uploadAndSetBody,
//   ctrls.updateBlog
// );
// router.delete("/:bid", [verifyAccessToken, isAdmin], ctrls.deleteBlog);
module.exports = router;

// CRUD - Create, Read, Update, Delete | POST, GET, PUT, DELETE
// Create - POST + PUT body
// GET + DELETE query ?var1=1&var2=2
