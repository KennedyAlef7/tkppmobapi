var Dall = require('./../../dall/presentialgw/gwpresentialfunctions');
var Assistent = require('./../control/assistent')


class Initializationmodel{

    constructor(branchid, equip){
        this.branchid = branchid;
        this.equip = equip;

    }

}
function isValid(req, res, next){
    var serialNumber = req.body.serialNumber
    var document = req.body.document

    if(!serialNumber)
        return res.status(400).json({message: 'serialNumber is required ' });
    else if(!document)
        return res.status(400).json({message: 'document is required ' });
    else
        next();
}
function ReturnModel(jsonresult){
    return new Initializationmodel(
        jsonresult['codBranch'],
        jsonresult['logicalNumber']
    )
}

async function InitializeTerminal(serial, document){
    var result = await Dall.Initialization(serial ,document );

    var jsonResult = Assistent.getDataInitialization(result.response.body);
     return ReturnModel(jsonResult);
}
module.exports = {
    isValid,
    InitializeTerminal
}