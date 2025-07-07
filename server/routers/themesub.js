const router = require("express").Router();
const ctrls = require("../controllers/themesub");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

const s3 = require("../middlewares/s3Handler");

router.post(
    "/",
    [verifyAccessToken, isAdmin],
    s3.uploadConfig.fields([
        { name: "themesubArtwork", maxCount: 1 },
    ]),
    s3.uploadAndSetBody,
    ctrls.createThemeSub
);
router.put (
    "/:tid",
    [verifyAccessToken, isAdmin],
    s3.uploadConfig.fields([
        { name: "themesubArtwork", maxCount: 1 },
    ]),
    s3.uploadAndSetBody,
    ctrls.updateThemeSub
);
router.get("/:tid", ctrls.getThemeSub);
router.get("/slug/:slug", ctrls.getThemeSubBySlug);
router.get("/", ctrls.getAllThemeSub);
router.delete("/:tid", [verifyAccessToken, isAdmin], ctrls.deleteThemeSub);

module.exports = router;