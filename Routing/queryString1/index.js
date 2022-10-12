const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const server = http.createServer(function (req, res) {
    let parseUrl = url.parse(req.url, true);
    let path = parseUrl.pathname;
    let trimPath = path.replace(/^\/+|\/+$/g, '');
    req.on('data', function (data) {
    });
    req.on('end', function (end) {
        let chosenHandler = (typeof (router[trimPath]) !== 'undefined') ? router[trimPath] : handlers.notFound;
        let data =
            {
                "trimPath": trimPath
            }
        ;
        chosenHandler(data, function (statusCode, payload) {
            statusCode = typeof (statusCode) == 'number' ? statusCode : 200;
            payload = typeof (payload) == 'object' ? payload : {};
            let payLoadString = JSON.stringify(payload);
            res.writeHead(statusCode)
            res.end(payLoadString);
            console.log("status " + statusCode + "payload" + payload);
        });

    });

})
server.listen(3000, function () {
    console.log("server running at localhost:3000 ");
})
let handlers = {};
handlers.sample = function (data, callback) {
    callback(406, {'name': 'sample handle'})
};
handlers.notFound = function (data, callback) {
    callback(404);
};
handlers.home = function (data, callback) {
    callback(200, 'home page');
};

let router = {
    'sample': handlers.sample,
    'home': handlers.home,
}