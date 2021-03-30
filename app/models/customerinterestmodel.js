var Dall = require('../../dall/gwnotification/NotificationFunctions')

class Customerinterestmodel{

    constructor(amount, installment, originalamount, interestamount){
        this.amount = amount;
        this.installment = installment;
        this.originalamount = originalamount;
        this.interestamount = interestamount;

    }

}

async function CalcCustomerInterest(serial , brand, amount, source){
    var ModelResultList = [];
   var result =  await Dall.CustomerInterestSimulate(serial, brand, amount,source);
    result.forEach(data => {
       ModelResultList.push (
           new Customerinterestmodel
           (
               data['calculatedValue'],
               data['installment'],
               data['originalValue'],
               data['interestValue'],
           )
       )

    });

    console.log('CalcCustomerInterest' + result);
    return ModelResultList;
}

 function isValid(req, res, next){

    if (!req.body.serialNumber)
        return res.status(400).json({message: 'serialNumber is required ' });
     else if (!req.body.brand)
         return res.status(400).json({message: 'Brand is required ' });
     else if (!req.body.amount)
         return res.status(400).json({message: 'amount is required ' });
     else if (!req.body.source)
         return res.status(400).json({message: 'source is required ' });

        else
            next();
    }

    module.exports = {
    isValid,
    CalcCustomerInterest
    }
