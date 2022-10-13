const http = require('http');
const fs = require('fs');
const url = require('url');


let handlers = {};
handlers.product = function (req, res) {
    fs.readFile('./view/products.html', function (err, data) {
        res.writeHead(200, 'text/html');
        res.write(data);
        return res.end();
    });
};
handlers.notFound = function (req, res) {
    fs.readFile('./view/notFound.html', function (err, data) {
        res.writeHead(200, 'text/html');
        res.write(data);
        return res.end();
    });
};
handlers.users = function (req, res) {
    fs.readFile('./view/users.html', function (err, data) {
        res.writeHead(200, 'text/html');
        res.write(data);
        return res.end();
    });
};
const server = http.createServer(function (req, res) {
    let parseUrl = url.parse(req.url, true);
    let path = parseUrl.pathname;
    let trimPath = path.replace(/^\/+|\/+$/g, '');
    let chosenHandler = (typeof (router[trimPath]) !== "undefined") ? router[trimPath] : handlers.notFound;
    chosenHandler(req,res);
})
server.listen(8080,function () {
    console.log('Server is running~~~')
})
let router = {
    'product': handlers.product,
    'users': handlers.users,
}