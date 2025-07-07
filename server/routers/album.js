const router = require("express").Router();
const ctrls = require("../controllers/album");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");
const s3 = require("../middlewares/s3Handler");
router.post(
    "/",
    [verifyAccessToken, isAdmin],

    s3.uploadConfig.fields([
        { name: "album_art", maxCount: 1 },
        { name: "album_cover", maxCount: 1 },
    ]),
    s3.uploadAndSetBody,
    ctrls.createAlbum
);
router.get("/", ctrls.getAllAlbums);
router.get("/:aid", ctrls.getAlbumById);
router.get("/slug/:slug", ctrls.getAlbumBySlug);
router.get("/artist/slug/:slug", ctrls.getAlbumbyArtistSlug);
router.put(
    "/:aid",
    [verifyAccessToken, isAdmin],
    s3.uploadConfig.fields([
        { name: "album_art", maxCount: 1 },
        { name: "album_cover", maxCount: 1 },
    ]),
    s3.uploadAndSetBody,
    ctrls.updateAlbum
);
router.delete("/:aid", [verifyAccessToken, isAdmin], ctrls.deleteAlbum);
router.get("/search/:q", ctrls.searchAlbumByTitle);

module.exports = router;

// CRUD - Create, Read, Update, Delete | POST, GET, PUT, DELETE
// Create - POST + PUT body
// GET + DELETE query ?var1=1&var2=2
