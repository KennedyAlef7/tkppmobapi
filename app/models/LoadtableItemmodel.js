var Dall = require('./../../dall/presentialgw/gwpresentialfunctions');
var Assistent = require('./../control/assistent')

class Loadtableitem{

    constructor(name, productId , Acquirer , Brand){
        this.name = name;
        this.productId = productId;
        this.Acquirer = Acquirer;
        this.Brand = Brand
    }


}
async function TableLoadEquip(equip, branchid){

    var ModelResultList = [];
    let resp = await Dall.soapRequest(equip, branchid);
    var resultList = Assistent.getproductsavailable(resp.response.body);
  resultList.product.forEach(element =>{
        ModelResultList.push(
            new Loadtableitem(
                element['labelName'],
                element['productId'],
                element['acquirer'],
                element['cardBrand']
            )

        )
    });


    return ModelResultList;



   // var json = JSON.parse(parser.toJson(resp.response.body, {reversible: true}));
  //  console.log(json);

    // let resultjson = convert.xml2json(resp.response.body, {compact: true, spaces: 4});
    //console.log();

}

function ReturnLoadItem(result){
    var listitemload = [];

    if(Array.isArray(result)){

        result.forEach(element => {
            listitemload.push(new Loadtableitem (
                element.labelName,
                element.productId,
                element.acquirer,
                element.cardBrand

            ))
            console.log(element);
        });

        return listitemload;
    }

}

function isValid(req, res, next){
    var TerminalId = req.body.LogicalNumber
    var BranchId = req.body.BranchId

    if(!TerminalId)
        return res.status(400).json({message: 'TerminalId is required ' });
    else if(!BranchId)
        return res.status(400).json({message: 'BranchId is required ' });
    else
        next();
}

module.exports = {
    Isvalid: isValid,
    TableLoadEquip: TableLoadEquip
}
