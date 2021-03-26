const { response } = require('../../config/server');
var auth = require('./../../auth/authentication');
const {userLogger, logger} = require('./../../logg/logger');

module.exports = function(app) {

    const bodyParser = require('body-parser');
    const { log } = require("console");

    app.use(bodyParser.json());
    app.post('/token', (req, res, next) => {

        auth.AuthUser(req).then(result=>{
            logger.log('info','Log datadog')
            logger.info('information using log');


            if(result)
            {
                return res.json({ auth: true, token: result });


            }
            else{
                res.status(401).end();
            }

            // result.forEach(item=>{
            //             console.log(item);
            //             userdata = item
            //         });
        })
            .catch(err=>{
                console.log(err)
            })
    })

}






