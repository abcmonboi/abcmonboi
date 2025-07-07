const router = require("express").Router();
const ctrls = require("../controllers/blogCategory");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");
const s3 = require("../middlewares/s3Handler");
router.post(
  "/",
  [verifyAccessToken, isAdmin],
  s3.uploadConfig.fields([{ name: "blogCategory_thumbnail", maxCount: 1 }]),
  s3.uploadAndSetBody,
  ctrls.createBlogCategory
);
router.get("/:bcid", ctrls.getBlogCategory);
router.get("/slug/:slug", ctrls.getBlogCategoryBySlug);
router.get("/", ctrls.getAllBlogCategory);
router.put(
  "/:bcid",
  [verifyAccessToken, isAdmin],
  s3.uploadConfig.fields([{ name: "blogCategory_thumbnail", maxCount: 1 }]),
  s3.uploadAndSetBody,
  ctrls.updateBlogCategory
);
router.delete("/:bcid", [verifyAccessToken, isAdmin], ctrls.deleteBlogCategory);
module.exports = router;

// CRUD - Create, Read, Update, Delete | POST, GET, PUT, DELETE
// Create - POST + PUT body
// GET + DELETE query ?var1=1&var2=2
