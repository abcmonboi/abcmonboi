const createError = require('http-errors');

const notFound = (req, res, next) => {
    const error = new Error(`Route - ${req.originalUrl} not found!`);
    res.status(404);
    next(error);
}
// Xử lý lỗi tập trung
const errorHandler = (error, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    return res.status(statusCode).json({
        success: false,
        mes: error?.message,
    });
}
const badRequest = (err,req, res, next) => {
    const error = createError.BadRequest(err);
    return res.status(error.status).json({
        success: false,
        err:1,
        mes: error.message,
    });
    
}
const internalServerError = (err,req, res, next) => {
    const error = createError.internalServerError();
    return res.status(error.status).json({
        err:1,
        mes: error.message,
    });
    
}

module.exports = {
    notFound,
    errorHandler,
    badRequest,
    internalServerError,
};