const { Sequelize } = require('sequelize');
const { log, sep } = require('../helpers/logging');

const EV_DB_INIT = '📚 DB'; // 'DB Init';
const SEQUELIZE_DIALECT = 'mysql';

sep();
log('DB coordinates:', EV_DB_INIT);
log('   db_host is \'' + process.env.DB_HOST + '\'', EV_DB_INIT);
log('   database is \'' + process.env.DB_DATABASE + '\'', EV_DB_INIT);
log('   db_user is \'' + process.env.DB_USER + '\'', EV_DB_INIT);
log('   db_password is... not shown here! :)', EV_DB_INIT);
log('   sequelize dialect is \'' + SEQUELIZE_DIALECT + '\'', EV_DB_INIT);

const seqHandle = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql'
    });

// (async () => {
//     try {
//         await seqHandle.authenticate();
//         log('DB connection has been established successfully.', EV_DB_INIT);
//     } catch (error) {
//         console.error('ERROR: Unable to connect to the database:', error);
//     }
// })();

module.exports = {
    seqHandle
}