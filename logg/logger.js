const { createLogger, format, transports, config } = require('winston');
const httpTransportOptions = {
    host: 'http-intake.logs.datadoghq.com',
    path: '/v1/input/8bf387c44d5f82ceaffe8b73b8186a81?ddsource=nodejs&service=apisalesman',
    ssl: true
};
const { combine, timestamp, json } = format;

const userLogger = createLogger({
    levels: config.syslog.levels,
    defaultMeta: { component: 'user-service' },
    format: combine(
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        json()
    ),

    transports: [
        new transports.Console(),
        new transports.File({ filename: 'combined.log' })
    ]
});
const logger = createLogger({
    level: 'info',
    exitOnError: false,
    format: format.json(),
    transports: [
        new transports.Http(httpTransportOptions),
    ],
});

module.exports = {
    userLogger: userLogger,
    logger: logger
};