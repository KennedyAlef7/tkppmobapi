const { response } = require('../../config/server');
var auth = require('./../../auth/authentication');
var loaditemmodel = require('../models/LoadtableItemmodel');




module.exports =  function(app) {

    const bodyParser = require('body-parser');
    const { log } = require("console");
    // let merchantdata=[];

    app.use(bodyParser.json());
    app.post('/loadtablesdata', auth.verifyJWT, loaditemmodel.Isvalid, (req, res, next) => {

        console.log(req.body);
        loaditemmodel.TableLoadEquip(req.body.LogicalNumber, req.body.BranchId).then(result=>{
            return res.json({TableLoad: result});

        });

    })}

