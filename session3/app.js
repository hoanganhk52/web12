const express = require('express');
const app = express();
const request = require('request');

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
});

app.get('/:webclass', function (req, res) {
    request('https://btvn-web12.herokuapp.com/api/' + req.params.webclass, function (error, response, body) {
        let html = '';
        let data = JSON.parse(body);

        if (data) {
            for (name of data.data) {
                html += `<li>${name}</li>`;
            }
        }

        res.send(html);
    });
});

app.listen(9999, function (err) {
    if (err) console.log(err);
    else console.log('Server is up!');
});