const userRouter = require('./user');
const songRouter = require('./song');
const albumRouter = require('./album');
const artistRouter = require('./artist');
const genreRouter = require('./genre');
const moodRouter = require('./mood');
const videoThemeRouter = require('./videotheme');
const instrumentRouter = require('./instrument');
const sfxRouter = require('./sfx');
const sfxCategoryRouter = require('./sfxCategory');
const collectionRouter = require('./collection');
const themesRouter = require('./themes');
const themesubRouter = require('./themesub');
const licenseRouter = require('./license');
const blogCategoryRouter = require('./blogCategory');
const blogRouter = require('./blog');
const metaTagRouter = require('./metaTag');
const {errorHandler, notFound, badRequest,internalServerError} = require('../middlewares/errHandler');
const initRoutes = (app) => {
    app.use('/api/user', userRouter);
    app.use('/api/song', songRouter);
    app.use('/api/album', albumRouter);
    app.use('/api/artist', artistRouter);
    app.use('/api/genre', genreRouter);
    app.use('/api/mood', moodRouter);
    app.use('/api/videotheme', videoThemeRouter);
    app.use('/api/instrument', instrumentRouter);
    app.use('/api/sfx', sfxRouter);
    app.use('/api/sfxCategory', sfxCategoryRouter);
    app.use('/api/collection', collectionRouter);
    app.use('/api/themes', themesRouter);
    app.use('/api/themesub', themesubRouter);
    app.use('/api/license', licenseRouter);
    app.use('/api/blogCategory', blogCategoryRouter);
    app.use('/api/blog', blogRouter);
    app.use('/api/metaTag', metaTagRouter);

    app.use('/', (req, res) => {res.send('SERVER ok')});
    app.use(notFound);
    //Xử lý lỗi tập trung
    app.use(errorHandler);
}

module.exports = initRoutes;