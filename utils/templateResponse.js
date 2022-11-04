const templateRespone = (httpStatus, message, data = null) => {
    return { status: httpStatus, message: message, data };
  };
  
  module.exports = templateRespone;