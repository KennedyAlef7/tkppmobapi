var parser = require('xml2json-light');


function findElements(element, xml) {
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
    console.log('procurando produtos');

    var jsonReturn = findElements('',xml);
    return jsonReturn.response.productLoad;
}

module.exports = {
    getproductsavailable: getproductsavailable
}
