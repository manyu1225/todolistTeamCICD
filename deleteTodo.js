const { headers } = require('./libs');

function delTodo(req, res, todos) {
    const url = req.url;
    if (url.startsWith("/todos/")) {
        const id = url.split('/').pop();
        const index = todos.findIndex(todo => todo.id === id);
        if (index !== -1) {
            todos.splice(index, 1);
            res.writeHead(200, headers);
            res.write(
                JSON.stringify({
                    "status": "200",
                    "data": todos
                })
            );
        } else {
            res.writeHead(500, headers);
            res.write(JSON.stringify({
                "status": "false",
                "data": `'無此ID: ${id}`,
            }));
        }
    }
    else if (url == "/todos") {
        todos.length = 0;
        res.writeHead(200, headers);
        res.write(
            JSON.stringify({
                "status": "200",
                "data": todos
            })
        );
    }
    res.end();
}

module.exports = delTodo;