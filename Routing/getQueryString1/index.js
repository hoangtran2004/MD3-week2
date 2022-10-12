const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const server = http.createServer(function (req, res) {
    let parseURL = url.parse(req.url, true);
    let queryStringObject = parseURL.query;
    res.end('Hello nodeJS');
    console.log(queryStringObject)
})
server.listen(8080, function () {
    console.log('server running at localhost 8080')
})