const router = require("express").Router();
const ctrls = require("../controllers/themes");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

const s3 = require("../middlewares/s3Handler");

router.post(
    "/",
    [verifyAccessToken, isAdmin],
    s3.uploadConfig.fields([
        { name: "themesArtwork", maxCount: 1 },
    ]),
    s3.uploadAndSetBody,
    ctrls.createThemes
);
router.put (
    "/:tid",
    [verifyAccessToken, isAdmin],
    s3.uploadConfig.fields([
        { name: "themesArtwork", maxCount: 1 },
    ]),
    s3.uploadAndSetBody,
    ctrls.updateTheme
);
router.get("/:tid", ctrls.getTheme);
router.get("/slug/:slug", ctrls.getThemeBySlug);
router.get("/", ctrls.getAllThemes);
router.delete("/:tid", [verifyAccessToken, isAdmin], ctrls.deleteTheme);

module.exports = router;