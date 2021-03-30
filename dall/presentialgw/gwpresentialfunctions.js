const axios = require('axios-https-proxy-fix');
var pad = require('pad-left');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
const gwaddress = '';

function TableLoadDallRequest(codequip, branchid, opts = {
    url: gwaddress + '/GeneralLoad/',
    headers: {
        "content-type": "application/xml",
    },
    xml: '    <request language="pt">\n' +
        '        <logicalNumber>'+pad(  codequip, 8, '0') +'</logicalNumber>\n' +
        '        <codBranch>'+branchid+'</codBranch>\n' +
        '        <dateTime>2019-06-12T16:16:19.348421-03:00</dateTime>\n' +
        '        <keyVersion>0</keyVersion>\n' +
        '        <timestamp>0</timestamp>\n' +
        '    </request>',
    timeout: 100000,
    proxy: false,
    rejectUnauthorized: false,
}) {
    const {
        url,
        headers,
        xml,
        timeout,
        proxy,
    } = opts;
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url,
            headers,
            data: xml,
            timeout,
            proxy,
        }).then((response) => {
            resolve({
                response: {
                    headers: response.headers,
                    body: response.data,
                    statusCode: response.status,
                },
            });
        }).catch((error) => {
            if (error.response) {
                console.error(`SOAP FAIL: ${error}`);
                reject(error.response.data);
            } else {
                console.error(`SOAP FAIL: ${error}`);
                reject(error);
            }
        });
    });
};

function Initialization(serial,document, opts = {
    url: gwaddress + '/Initialization/',
    headers: {
        "content-type": "application/xml",
    },
    xml: '    <request language="pt">\n' +
        '        <document>'+document+'</document>\n' +
        '        <serialNumber>'+serial+'</serialNumber>\n' +
        '    </request>',
    timeout: 100000,
    proxy: false,
    rejectUnauthorized: false,
}) {
    const {
        url,
        headers,
        xml,
        timeout,
        proxy,
    } = opts;
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url,
            headers,
            data: xml,
            timeout,
            proxy,
        }).then((response) => {
            //console.log(response);
            resolve({
                response: {
                    headers: response.headers,
                    body: response.data,
                    statusCode: response.status,
                },
            });
        }).catch((error) => {
            if (error.response) {
                console.error(`SOAP FAIL: ${error}`);
                reject(error.response.data);
            } else {
                console.error(`SOAP FAIL: ${error}`);
                reject(error);
            }
        });
    });
};

module.exports = {
    TableLoadDallRequest,
    Initialization
}