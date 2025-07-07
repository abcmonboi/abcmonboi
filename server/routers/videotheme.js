const router = require('express').Router();
const ctrls = require('../controllers/videotheme');
const { verifyAccessToken,isAdmin } = require('../middlewares/verifyToken');

router.post ('/',[verifyAccessToken,isAdmin],ctrls.createVideoTheme);
router.get ('/',ctrls.getAllVideoTheme);
router.get ('/:gid',ctrls.getVideoThemeById);
router.put ('/:gid',[verifyAccessToken,isAdmin],ctrls.updateVideoTheme);
router.delete ('/:gid',[verifyAccessToken,isAdmin],ctrls.deleteVideoTheme);



module.exports = router;

// CRUD - Create, Read, Update, Delete | POST, GET, PUT, DELETE
// Create - POST + PUT body
// GET + DELETE query ?var1=1&var2=2