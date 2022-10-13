const http = require('http');
const url = require('url');
const fs = require('fs');
const qs = require('qs');
const StringDecoder = require('string_decoder').StringDecoder;

const server = http.createServer(function (req, res) {
    let parseUrl = url.parse(req.url, true);

    let path = parseUrl.pathname;
    let trimPath = path.replace(/^\/+|\/+$/g, '');

    let method = req.method.toLowerCase();

    if(method==='get'){
        let chosenHandler = (typeof (router[trimPath]) !== 'undefined') ? router[trimPath] : handlers.notFound;
        chosenHandler(req, res);
    }
    else{
        let chosenHandler = router.profile;
        chosenHandler(req, res);
    }
});
let handlers = {};
handlers.login = function (rep, res) {
    fs.readFile('./views/login.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
};
handlers.home = function (rep, res) {
    fs.readFile('./views/home.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
};

handlers.notFound = function (rep, res) {
    fs.readFile('./views/notFound.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
};
handlers.profile = function (req, res){
    let data = '';
    req.on('data', chunk => {
        data += chunk;
    })
    req.on('end', () => {
        data= qs.parse(data);
        let name = data.name;
        let stringObject = "<h1>Hello " + name+ "</h1>";
        console.log(name);
        fs.writeFile('./views/profile.html', stringObject,  function(err) {
            if (err) {
                return console.error(err);
            }
            console.log("Ghi du lieu vao file thanh cong!");
            console.log("Doc du lieu vua duoc ghi");
            fs.readFile('./views/profile.html', function (err, data) {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                return res.end();
            });
        });
    });
}
let router = {
    'home': handlers.home,
    'login': handlers.login,
    'profile':handlers.profile
}
server.listen(3000, function () {
    console.log('server running at localhost:3000 ')
});
