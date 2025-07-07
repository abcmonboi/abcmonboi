const router = require('express').Router();
const ctrls = require('../controllers/instrument');
const { verifyAccessToken,isAdmin } = require('../middlewares/verifyToken');

router.post ('/',[verifyAccessToken,isAdmin],ctrls.createInstrument);
router.get ('/',ctrls.getAllInstrument);
router.get ('/:gid',ctrls.getInstrumentById);
router.put ('/:gid',[verifyAccessToken,isAdmin],ctrls.updateInstrument);
router.delete ('/:gid',[verifyAccessToken,isAdmin],ctrls.deleteInstrument);



module.exports = router;

// CRUD - Create, Read, Update, Delete | POST, GET, PUT, DELETE
// Create - POST + PUT body
// GET + DELETE query ?var1=1&var2=2