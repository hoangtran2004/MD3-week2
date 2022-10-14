const http = require('http');
const fs = require('fs');
const server = http.createServer(function (req, res) {
    let html = '';
    fs.readFile('./data/phone.json', "utf-8", (err, str) => {
        str = JSON.parse(str);
        str.forEach((value, index) => {
            html += '<tr>';
            html += `<td>${index + 1}</td>`
            html += `<td>${value.id}</td>`
            html += `<td>${value.name}</td>`
            html += `<td>${value.price}</td>`
            html+=`<td><button class="btn btn-danger">Submit</button></td>>`
            html += '</tr>';
        })

    })
    fs.readFile('./views/listPhone.html', 'utf-8', function (err, data) {
        res.writeHead(200, 'text/html');
        data = data.replace('{id}', html);
        data = data.replace('{product}', html);
        data = data.replace('{price}', html);
        res.write(data);
        res.end();
    })
})
server.listen(3000, function () {
    console.log('server running')
})