var parser = require('xml2json-light');


function findElements(xml) {
    var output = [];

    var json = parser.xml2json(xml);
        console.log("to json ->", json);
        return json;

   // console.log(prdId);
    //return prdId;
  /*  var nodes = xml.childNodes;
   // console.log(nodes);
    if (nodes != null) {
        for (var i = 0; i < nodes.length; i++) {

            if (nodes[i].nodeName === element ) {
                console.log(nodes[i].childNodes[6].nodeValue);

            } else {
                output = output.concat(findElements(element, nodes[i]));
            }
        }
    }
    return output;*/
}


function getproductsavailable(xml){

    var jsonReturn = findElements(xml);
    return jsonReturn.response.productLoad;
}
function getDataInitialization(xml){

    var jsonReturn = findElements(xml);
    console.log(jsonReturn);
    return jsonReturn.response;
}

module.exports = {
    getproductsavailable: getproductsavailable,
    getDataInitialization: getDataInitialization
}
