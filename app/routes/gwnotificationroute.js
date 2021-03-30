const { response } = require('../../config/server');
var auth = require('./../../auth/authentication');
var customerInt = require('../models/customerinterestmodel');

module.exports =  function(app) {

    const bodyParser = require('body-parser');
    const { log } = require("console");
    app.use(bodyParser.json());
    app.post('/customerinterest', auth.verifyJWT, customerInt.isValid, (req, res, next) => {

        console.log(req.body);
        customerInt.CalcCustomerInterest(req.body.serialNumber,
            req.body.brand,
            req.body.amount,
            req.body.source).then(result=>{
            return res.json({InterestResult: result});

        }).catch( result=>{
            return res.json({Error: result});

        })


    });



}

