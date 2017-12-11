/**
 * Controller class home
 * @module home
 * @extends app.Controller
 * @since 1.0.0
 */


module.exports = app => {
    class Home extends app.Controller {


        /**
         * Controller home test
         * @public
         * @method Home#index
         * @since 1.0.0
         */
        async index() {
            this.ctx.body = {
                code: 200,
                data: {
                    info: 'test successed'
                }
            };
        }


        /**
         * Get all users' info
         * @public
         * @method Home#getUsers
         * @since Home#getUsers
         */
        async getUsers() {
            const str = 'select * from users';

            try {
                const users = await this.service.db.query(str, []);
                this.ctx.body = {
                    code: 200,
                    data: users
                };
            } catch(err) {
                this.ctx.body = {
                    code: 400,
                    message: `get users' info failed`
                };
            }
        }


        /**
         * Get some user's info
         * @public
         * @method Home#getUser
         * @since 1.0.0
         */
        async getUser() {
            const userId = this.ctx.params.userId || 0;
            const str = 'select * from users where id = ?';
            try {
                let user = await this.service.db.query(str, [userId]);
                user = user[0] || {};
                this.ctx.body = {
                    code: 200,
                    data: user
                };
            } catch (err) {
                this.ctx.body = {
                    code: 400,
                    data: {
                        info: 'get user info failed'
                    }
                }
            }
        }


        /**
         * Add a new user to database
         * @public
         * @method Home#addUser
         * @since 1.0.0
         */
        async addUser() {
            const user = this.ctx.request.body;
            if (await this.service.db.exists(user)) {
                this.ctx.body = {
                    code: 403,
                    message: 'user(${userId}) exists'
                }
                return;
            }

            try {
                const str = `insert into users values(?, ?, ?, ?)`;
                await this.app.db.query(str, [user.id, user.name, user.age, user.sex]);
                this.ctx.body = {
                    code: 200,
                    data: {
                        info: 'add user successed'
                    }
                };
            } catch (err) {
                this.ctx.body = {
                    code: 403,
                    message: 'add user failed'
                };
            }
        }


        /**
         * Delete a user from users through userId
         * @public
         * @method Home#deleteUser
         * @since 1.0.0
         */
        async deleteUser() {
            const userId = this.ctx.params.userId || '000';
            if (!await this.service.db.exists) {
                this.ctx.body = {
                    code: 404,
                    message: `user(${userId}) doesn't exist`
                };
                return;
            }

            const str = `delete from user where id = ?`;
            try {
                await this.app.db.query(str, [userId]);
                this.ctx.body = {
                    code: 203,
                    data: {
                        info: `delete user(${userId}) successed`
                    }
                };
                return;
            } catch(err) {
                this.ctx.body = {
                    code: 403,
                    message: `delete user(${userId}) failed`
                };
            }
        }
    }

    return Home;
}