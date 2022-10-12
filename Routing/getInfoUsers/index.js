const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const server = http.createServer(function (req, res) {
    let decoder = new StringDecoder('utf-8');
    let buffer = '';
    req.on('data', function (data) {
        buffer += decoder.write(data)
    });
    req.on('end', function (end) {
        buffer += decoder.end()
        res.end('Hello nodeJS');
        console.log(buffer)
    })
})
server.listen(8080, function () {
    console.log('server running at localhost 8080')
})
