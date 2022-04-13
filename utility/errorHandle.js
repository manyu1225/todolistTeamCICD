const { headers } = require("../libs");
const httpStatusCodes = require("./httpStatusCodes");

/**
 * @param {*} res
 * @param {AppError} err 自定義錯誤訊息物件
 */

function errorHandle(res, err) {
  err.statusCode = err.statusCode || httpStatusCodes.INTERNAL_SERVER;
  err.status = err.status || "error";

  res.writeHead(err.statusCode, headers);
  res.write(
    JSON.stringify({
      status: err.status,
      message: err.message,
    })
  );
  res.end();
}

module.exports = errorHandle;
