var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
    name:'Tkppmobapi',
    description: 'Api mobile tkpp',
    script: 'D:\\Dev\\NodeJs\\tkppmobapi\\index.js'
});

svc.logOnAs.domain = 'local';
svc.logOnAs.account = 'kennedy.oliveira';
svc.logOnAs.password = 'Celer2021@';
// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
    svc.start();
});

svc.install();