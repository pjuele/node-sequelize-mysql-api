var log4js = require("log4js");

log4js.configure({
    appenders: {
        out: { type: 'stdout' },
        everythingFile: { type: 'file', filename: 'application.log' },
        // emergenciesFile: { type: 'file', filename: 'emergencies.log' },
        emergenciesEmail: {
            type: '@log4js-node/smtp',
            transport: {
                plugin: 'smtp',
                options: {
                    host: process.env.SMTP_HOST,
                    port: process.env.SMTP_PORT,
                    auth: {
                        user: process.env.SMTP_USER,
                        pass: process.env.SMTP_PASSWORD
                    }
                }
            },
            recipients: process.env.LOG_MAIL_TO,
            subject: 'Automated API error log.',
            sender: LOG_MAIL_FROM
        },
        'email-me-errors': { type: 'logLevelFilter', appender: 'emergenciesEmail', level: 'error' }
    },
    categories: {
        default: { appenders: ['email-me-errors', 'everythingFile'], level: 'debug' }
    }
});
var logger = log4js.getLogger();
logger.level = "debug"; // default level is OFF - which means no logs at all.
logger.debug("Logger initialised!");

logger.debug('This goes to all-the-logs.log');
logger.info('As does this.');
logger.error('This goes to all-the-logs.log and oh-no-not-again.log');

log4js.shutdown

const serverAppName = "MySQL-Serialise | REST API"; // Start of line for console logs:

const
    log = (msg, event) => console.log("\u21AA " + (process.env.SERVER_APP_NAME || "🌱") + " \u2192 " + event + " \u2508\u21E2 " + msg),
    sep = () => console.log('·············································································');

module.exports = {
    log,
    sep,
    logger
}