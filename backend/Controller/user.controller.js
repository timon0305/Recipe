const {
    sFindUserName,
    sFindUserEmail,
    sCreateUser,
    sEmailVerify,
    sGetUserByEmail,
    sCreateNewCode,
    sConfirmCode,
    sResetPassword,
} = require('../Service/user.service');

const {genSaltSync, hashSync, compareSync} = require('bcryptjs');
const {sign} = require('jsonwebtoken');
const crypto = require('crypto');
const sgMail = require('@sendgrid/mail');
const datetime = require('node-datetime');

module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        sFindUserName(body.userName, (err, results) => {
           if (results) {
               return res.json({
                   success: false,
                   msg: 'UserName is already existed'
               })
           }
           else {
               sFindUserEmail(body.userEmail, (err, results) => {
                   if (results) {
                       return res.json({
                           success: false,
                           msg: 'UserEmail is already existed'
                       })
                   }
                   else {
                       const salt = genSaltSync(10);
                       body.password = hashSync(body.password, salt);
                       let token = crypto.randomBytes(10).toString('hex');
                       body.verify = token;
                       body.active = '0';
                       body.role = 'user';
                       sCreateUser(body, (err, results) => {
                           if (err) {
                               return res.status(500).json({
                                   success: false,
                                   msg: 'Database Connection Error'
                               })
                           }
                           sgMail.setApiKey(process.env.SENDGRID_API_KEY);
                           const message = {
                               to: body.userEmail,
                               from: 'timon0305@outlook.com',
                               subject: 'Account Verification Token',
                               text: 'Hello, ' + body.userName + '\n\n' + 'Please verification your account code \n\n' + token + '\n',
                           };
                           sgMail.send(message);

                           return res.status(200).json({
                               success: true,
                               data: results,
                               msg: 'Successfully Registered. You have to verify your email.'
                           })
                       })
                   }
               });
           }
        });

    },

    emailVerify: (req, res) => {
        sEmailVerify(req.body.code, (err, results) => {
            if (results.changedRows) {
                return res.json({
                    success: true,
                    msg: 'Successfully Verified'
                })
            }
            else {
                return res.json({
                    success: false,
                    msg: 'Invalid Verification Code. Check again'
                })
            }
        })
    },

    userLogin: (req, res) => {
        const body = req.body;
        sGetUserByEmail(body.userEmail, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    msg: 'Server Error'
                })
            }
            if (!results) {
                return res.status(200).json({
                    success: false,
                    data: null,
                    msg: `User doesn't exist`
                })
            }
            if (results.active === '1') {
                const passwordCompare = compareSync(body.password, results.userPassword);
                if (passwordCompare) {
                    results.userPassword = undefined;
                    const jsontoken = sign({result: results}, 'recipe2020', {
                        expiresIn: '1h'
                    });
                    return res.status(200).json({
                        success: true,
                        data: results,
                        msg: 'Login Successfully',
                        token: jsontoken,
                    })
                }
                else {
                    return res.json({
                        success: false,
                        data: results,
                        msg: 'Invalid Password'
                    })
                }
            } else {
                let token = crypto.randomBytes(10).toString('hex');
                sgMail.setApiKey(process.env.SENDGRID_API_KEY);
                const message = {
                    to: body.userEmail,
                    from: 'timon0305@outlook.com',
                    subject: 'Account Verification Token',
                    text: 'Hello, ' + body.userName + '\n\n' + 'Please verification your account code \n\n' + token + '\n',
                };
                sgMail.send(message);
                body.code = token;
                sCreateNewCode(body, (err, response) => {
                    console.log(response)
                });
                return res.status(200).json({
                    success: false,
                    data: results,
                    msg: `You should verify`
                })
            }
        })
    },

    emailConfirm: (req, res) => {
        const body = req.body;
        sGetUserByEmail(body.userEmail, (err, results) => {
            if (!results) {
                return res.json({
                    success: false,
                    msg: `User doesn't exist`
                })
            } else {
                let token = crypto.randomBytes(10).toString('hex');
                sgMail.setApiKey(process.env.SENDGRID_API_KEY);
                const message = {
                    to: body.userEmail,
                    from: 'timon0305@outlook.com',
                    subject: 'Reset Password Confirm',
                    text: 'Hello, ' + results.userName + '\n\n' + 'Please verification your account code for reset password \n\n' + token + '\n',
                };
                sgMail.send(message);
                body.code = token;
                sCreateNewCode(body, (err, response) => {
                    console.log(response)
                });
                return res.json({
                    success: true,
                    msg: `Please check your email`,
                    data: results
                })
            }
        })
    },

    confirmCode: (req, res) => {
        sConfirmCode(req.body.code, (err, results) => {
            if (!results) {
                return res.json({
                    success: false,
                    msg: 'Invalid Verification Code. Check again',
                    data: ''
                })
            }
            else {
                return res.json({
                    success: true,
                    data: results[0].userEmail,
                    msg: 'Successfully Verify'
                })
            }
        })
    },

    resetPassword: (req, res) => {
        const salt = genSaltSync(10);
        req.body.password = hashSync(req.body.password, salt);
        sResetPassword(req.body, (err, results) => {
            if (results.changedRows) {
                return res.status(200).json({
                    success: true,
                    msg: 'Successfully Changed'
                })
            }
            else {
                return res.json({
                    success: false,
                    msg: 'Error'
                })
            }
        })
    }
};
