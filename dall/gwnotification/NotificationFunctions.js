const http = require('https')
const querystring = require('querystring');
const fs = require('fs');
const axios = require('axios').default;
let jsonTokenData = require('./credentials.json');
var urlbase = 'notificationaff.redeceler.com.br';
var port = 8650;

async function generateTokenNtf(){


    const postData = querystring.stringify(jsonTokenData)

    var url = urlbase + '/secureaccess/token'
    let data;

    var options = {
        hostname: urlbase,
        port: port,
        path: '/secureaccess/token',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(postData)
        }
    };

    var req = http.request(options, (res) => {
        res.setEncoding('utf8');

        res.on('data', d =>
         data = JSON.parse(d)
        );
        res.on('end', () => {
            console.log('saiu antes')
            console.log('Token: '+ data['access_token'])
            return data['access_token'];
        });
    });

    req.on('error', (e) => {
        console.log(`Houve um erro: ${e.message}`);
    });


    req.write(postData);
    req.end();



}

async function SimulateCustomerInterest(serial, brand,amount, source){
    const postData = '{\n' +
        '  "serial": "'+serial+'",\n' +
        '  "brandName": "'+brand+'",\n' +
        '  "amount": '+amount+',\n' +
        '  "sourceTran": "'+source+'"\n' +
        '}';


    var token = await genTokenAxios();
    console.log('token no método: '+token);
    console.log('token '+ token);
    var options = {
        hostname: urlbase,
        port: port,
        path: '/api/v1/private/CustomerInterest',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData),
            'Authorization': 'Bearer '+token
        }
    };

    var req = http.request(options, (res) => {
        res.setEncoding('utf8');
        let data;
        res.on('data', d =>

            data = JSON.parse(d)
        );
        res.on('end', () => {
            console.log(data);
            return data;
        });
    });

    req.on('error', (e) => {
        console.log(`Houve um erro: ${e.message}`);
    });

// aqui podes enviar data no POST
    req.write(postData);
    req.end();


}

async function genTokenAxios() {

    const postData = querystring.stringify(jsonTokenData)

    let res = await axios.post('https://notificationaff.redeceler.com.br:8650//secureaccess/token', postData);
    console.log('dados response ')
    console.log(res.data);
    return res.data['access_token'];
}

async function CustomerInterestSimulate (serial , brand , amount, source){

    const postData = '{\n' +
        '  "serial": "'+serial+'",\n' +
        '  "brandName": "'+brand+'",\n' +
        '  "amount": '+amount+',\n' +
        '  "sourceTran": "'+source+'"\n' +
        '}';

    var token = await genTokenAxios();

    let config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token
        }
    }
    let res = await axios.post('https://notificationaff.redeceler.com.br:8650/api/v1/private/CustomerInterest', postData, config);
    console.log('dados response ')
    console.log(res.data);
    return res.data['details'];


}


module.exports = {
    generateTokenNtf,
    SimulateCustomerInterest,
    genTokenAxios,
    CustomerInterestSimulate
}
