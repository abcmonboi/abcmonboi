const router = require('express').Router();
const ctrls = require('../controllers/mood');
const { verifyAccessToken,isAdmin } = require('../middlewares/verifyToken');

router.post ('/',[verifyAccessToken,isAdmin],ctrls.createMood);
router.get ('/',ctrls.getAllMoods);
router.get ('/:gid',ctrls.getMoodById);
router.put ('/:gid',[verifyAccessToken,isAdmin],ctrls.updateMood);
router.delete ('/:gid',[verifyAccessToken,isAdmin],ctrls.deleteMood);



module.exports = router;

// CRUD - Create, Read, Update, Delete | POST, GET, PUT, DELETE
// Create - POST + PUT body
// GET + DELETE query ?var1=1&var2=2