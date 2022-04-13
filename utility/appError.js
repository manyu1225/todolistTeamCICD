/**
 * @param {string} message 要顯示的錯誤訊息
 * @param {number} statusCode 參見 httpStatusCodes.js
 */

class AppError extends Error {
  constructor(message, statusCode) {
    // 繼承 Erro 物件的錯誤訊息功能
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this);
  }
}

module.exports = AppError;
