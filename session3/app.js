const express = require('express');
const app = express();
const request = require('request');

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
});

app.get('/favicon.ico', (req, res) => res.status(204));

app.get('/:webclass', function (req, res) {
    let url = 'https://btvn-web12.herokuapp.com/api/' + req.params.webclass;
    getDataByUrl(url, (data) => {
        res.send(data.data.map(item => `<li>${item}</li>`).join(''));
    });

});

function getDataByUrl(url, onGetDataDone) {
    request(url, function (error, response, body) {
        if (body) {
            try {
                let data = JSON.parse(body);
                onGetDataDone(data);
            } catch (e) {
                console.log(e);
            }
        }
    });
}

app.listen(9999, function (err) {
    if (err) console.log(err);
    else console.log('Server is up!');
});