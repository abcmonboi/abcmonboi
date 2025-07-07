const router = require('express').Router();
const ctrls = require('../controllers/genre');
const { verifyAccessToken,isAdmin } = require('../middlewares/verifyToken');

router.post ('/',[verifyAccessToken,isAdmin],ctrls.createGenre);
router.get ('/',ctrls.getAllGenres);
router.get ('/:gid',ctrls.getGenreById);
router.put ('/:gid',[verifyAccessToken,isAdmin],ctrls.updateGenre);
router.delete ('/:gid',[verifyAccessToken,isAdmin],ctrls.deleteGenre);



module.exports = router;

// CRUD - Create, Read, Update, Delete | POST, GET, PUT, DELETE
// Create - POST + PUT body
// GET + DELETE query ?var1=1&var2=2