/**
 * Service class DB
 * @module db
 * @extends app.Service
 * @since 1.0.0
 */

const mysql = require('mysql');

module.exports = app => {
    class DB extends app.Service {

        /**
         * Encapsulation of database opration
         * @public
         * @method DB#query
         * @param {string} str - query string with parameter replace by '?' 
         * @param {Array[Object]} values - query parameter releated to table attributes
         * @return {Promise<Object>}
         * array include query result set when query database
         * 
         *  throw error when query failed
         */
        async query(str, values) {
            const _this = this;
            const connection = mysql.createConnection(_this.app.config.db);
            connection.connect();
            return new Promise((resolve, reject) => {
                connection.query(str, values, (err, results, fields) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(results);
                });
            }).then(results => {
                connection.end();
                return results;
            }).catch(error => {
                connection.end();
                throw error;
            });
        }


        /**
         * Judge user exists through userId or not
         * @public
         * @method DB#exists
         * @param {String} userId - user's register code
         * @return {Promise<Number>}
         * true when user exists
         * false when user doesn't exists or query failed
         */
        async exists(userId) {

            const str = 'select * from users where id = ?';

            try {
                const users = await this.query(str, [userId]);
                return users.length ? true : false;
            } catch(err) {
                return false;
            }
        }
    }

    return DB;
}