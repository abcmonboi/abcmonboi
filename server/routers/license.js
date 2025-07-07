const router = require("express").Router();
const ctrls = require("../controllers/license");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

router.post("/", [verifyAccessToken, isAdmin], ctrls.createLicense);
router.get("/:lid", ctrls.getLicense);
router.get("/slug/:slug", ctrls.getLicenseBySlug);
router.get("/", ctrls.getAllLicense);
router.put("/:lid", [verifyAccessToken, isAdmin], ctrls.updateLicense);
router.delete("/:lid", [verifyAccessToken, isAdmin], ctrls.deleteLicense);
module.exports = router;

// CRUD - Create, Read, Update, Delete | POST, GET, PUT, DELETE
// Create - POST + PUT body
// GET + DELETE query ?var1=1&var2=2
