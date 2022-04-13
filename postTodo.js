const { v4: uuidv4 } = require("uuid");
const errorHandle = require("./utility/errorHandle");
const httpStatusCodes = require("./utility/httpStatusCodes");
const { headers } = require("./libs");
const AppError = require("./utility/appError");

function postTodo(req, res, todos) {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });
  req.on("end", () => {
    try {
      const { title } = JSON.parse(body);
      if (title !== undefined) {
        const todo = {
          title,
          id: uuidv4(),
        };
        todos.push(todo);

        res.writeHead(httpStatusCodes.CREATED, headers);
        res.write(
          JSON.stringify({
            status: "success",
            data: todos,
          })
        );
        res.end();
      } else {
        const err = new AppError("欄位輸入錯誤", httpStatusCodes.BAD_REQUEST);
        errorHandle(res, err);
      }
    } catch (err) {
      errorHandle(res, err);
    }
  });
}

module.exports = postTodo;
