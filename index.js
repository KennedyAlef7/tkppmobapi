require("dotenv-safe").config();
var app = require('./config/server');
var expressValidator = require('express-validator');

//app.use(expressValidator());

app.listen(3001);
console.log("Servidor esc na porta 3000...")