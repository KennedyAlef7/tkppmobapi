const http = require('https')
const querystring = require('querystring');
const fs = require('fs');
let jsonTokenData = require('./credentials.json');

function generateTokenNtf(){


    const postData = querystring.stringify(jsonTokenData)

    var url = 'https://notificationaff.redeceler.com.br:8650/secureaccess/token'


    var options = {
        hostname: 'notificationaff.redeceler.com.br',
        port: 8650,
        path: '/secureaccess/token',
        method: 'POST', // <--- aqui podes escolher o método
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(postData)
        }
    };

    var req = http.request(options, (res) => {
        res.setEncoding('utf8');
        let data = '';
        res.on('data', d => data += d);
        res.on('end', () => {
            console.log('Terminado! Data:', data);
        });
    });

    req.on('error', (e) => {
        console.log(`Houve um erro: ${e.message}`);
    });

// aqui podes enviar data no POST
    req.write(postData);
    req.end();

}


module.exports = {
    generateTokenNtf
}
