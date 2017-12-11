/**
 * Default config
 * @module config
 * @since 1.0.0
 */


const path = require('path');


module.exports = appInfo => {
    const Config = {
        keys: appInfo.name + Date.parse(new Date()),

        security: {
            csrf: {
                IgnoreJSON: true,
            }
        },

        rundir: path.join(appInfo.baseDir, `../${appInfo.name}info/run`),

        logger: {
            dir: path.join(appInfo.baseDir, `../${appInfo.name}info/log`),
        },

        notfound: {
            pageUrl: '/public/404.html'
        }
    }

    Config.db = {
        connectionLimit : 10,
        host            : 'localhost',
        user            : 'root',
        password        : '123',
        database        : 'rds_mysql_web'
    };

    return Config;
}