const { headers } = require('./libs');

function getTodo(res, todos) {
    res.writeHead(200, headers);
    res.write(JSON.stringify(
        {
            "status": "200",
            "data": todos
        }
    ));
    res.end();
}

module.exports = getTodo;