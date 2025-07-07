const router = require("express").Router();
const ctrls = require("../controllers/user");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");
const s3 = require("../middlewares/s3Handler");

router.post("/register", ctrls.register);
router.get("/finalregister/:token", ctrls.finalRegister);
router.post("/login", ctrls.login);
router.get("/current", verifyAccessToken, ctrls.getCurrent);
router.post("/refreshtoken", ctrls.refreshAccessToken);
router.get("/logout", ctrls.logout);
router.post("/forgotpassword", ctrls.forgotPassword);
router.put("/resetpassword", ctrls.resetPassword);
// router.use(verifyAccessToken)
router.get("/", [verifyAccessToken, isAdmin], ctrls.getUsers);
//Check theo medthod khi trùng url
router.delete("/:uid", [verifyAccessToken, isAdmin], ctrls.deleteUser);
router.put(
  "/current",
  verifyAccessToken,
  s3.uploadConfig.fields([{ name: "avatar", maxCount: 1 }]),
  s3.uploadAndSetBody,
  ctrls.updateUser
);
router.put(
  "/uploadavatar",
  s3.uploadConfig.fields([{ name: "avatar", maxCount: 1 }]),
  s3.uploadAndSetBody,
  ctrls.uploadAvatar
);
router.put("/:uid", [verifyAccessToken, isAdmin], ctrls.updateUserByAdmin);

module.exports = router;

// CRUD - Create, Read, Update, Delete | POST, GET, PUT, DELETE
// Create - POST + PUT body
// GET + DELETE query ?var1=1&var2=2
