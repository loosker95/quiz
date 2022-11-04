const httpStatus = require('http-status');
const { Sequelize } = require('sequelize');
const ApiError = require('../utils/ApiError');

const errorConverter = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || error instanceof Sequelize.Error ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};

const errorHandler = (err, req, res, next) => {
    let { statusCode, message } = err;
    const response = {
      status: statusCode,
      message: message
    };
    res.status(statusCode).send(response);
  };

module.exports = {
  errorConverter,
  errorHandler
}