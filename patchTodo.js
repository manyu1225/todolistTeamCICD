const errorHandle = require('./errorHandle');
const { headers } = require('./libs');

function patchTodo(req, res, todos) {
  let body = '';
  req.on('data', chunk => {
    body += chunk;
  })
  req.on('end', () => {
    try {
        const title = JSON.parse(body).title;
        const id = req.url.split('/')[2];

        const index =todos.findIndex(element=>element.id == id)
        
        //沒正確傳入title
        if (!title) {
            errorHandle(res);
            return;
        }

        //找不到此Id
        if (index==-1) {
            errorHandle(res);
            return;
        }

        todos[index].title= title;

        res.writeHead(200, headers);
        res.write(JSON.stringify({
          status: 'success',
          data: todos
        }));
        res.end();
    } catch {
      errorHandle(res);
    }
  })
}

module.exports = patchTodo; 