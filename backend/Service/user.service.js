const pool = require('../Config/database');

module.exports = {
    sFindUserName: (userName, callback) => {
        pool.query(
            `select * from users where userName = ?`,
            [userName],
            (err, results) => {
                if (err) {
                    callback(err);
                }
                return callback(null, results[0]);
            }
        )
    },

    sFindUserEmail: (userEmail, callback) => {
        pool.query(
            `select * from users where userEmail = ?`,
            [userEmail],
            (err, results) => {
                if (err) {
                    callback(err);
                }
                return callback(null, results[0]);
            }
        )
    },

    sCreateUser: (data, callback) => {
        pool.query(
            `insert into users(userName, userEmail, userPassword, role, verify, active) values(?, ?, ?, ?, ?, ?)`,
            [
                data.userName,
                data.userEmail,
                data.password,
                data.role,
                data.verify,
                data.active,
            ],
            (error, result) => {
                if (error) {
                    return callback(error)
                }
                return callback(null, result)
            }
        )
    },

    sEmailVerify: (code, callback) => {
        pool.query(
            `update users set active = "1" where verify = ?`,
            [code],
            (err, result) => {
                if (err) {
                    callback(err)
                }
                return callback(null, result)
            }
        )
    },

    sGetUserByEmail: (userEmail, callback) => {
        pool.query(
            `select * from users where userEmail = ?`,
            [userEmail],
            (err, result) => {
                if (err) {
                    callback(err)
                }
                return callback(null, result[0])
            }
        )
    },

    sCreateNewCode: (data, callback) => {
        console.log(data);
        pool.query(
            `update users set verify ="`+ data.code +`"  where userEmail = ?`,
            [data.userEmail],
            (err, result) => {
                if (err) {
                    callback(err)
                }
                return callback(null, result)
            }
        )
    },

    sConfirmCode: (code, callback) => {
        pool.query(
            `select * from users where verify = ?`,
            [code],
            (err, result) => {
                if (err) {
                    callback(err)
                }
                return callback(null, result)
            }
        )
    },

    sResetPassword: (data, callback) => {
        const userEmail = data.userEmail;
        const rPassword = data.password;
        pool.query(
            `update users set userPassword ="`+ rPassword +`"  where userEmail = ?`,
            [userEmail],
            (err, result) => {
                if (err) {
                    callback(err)
                }
                return callback(null, result)
            }
        )
    }
};