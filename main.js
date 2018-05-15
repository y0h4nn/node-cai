const http = require('http');

http.createServer((req, res) => {
    res.write('hello world lol');
    res.end();
}).listen(8080);