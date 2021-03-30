const { response } = require('../../config/server');
var auth = require('./../../auth/authentication');
var loaditemmodel = require('../models/LoadtableItemmodel');
var initmodel = require('../models/Initializationmodel');



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

    });

    app.post('/initialization', auth.verifyJWT, initmodel.isValid, (req, res, next) => {

        console.log(req.body);
        initmodel.InitializeTerminal(req.body.serialNumber, req.body.document).then(result=>{
            return res.json({InitializationData: result});

        });

    })


}

