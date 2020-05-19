const {
    createUser,
    emailVerify,
    userLogin,
    emailConfirm,
    confirmCode,
    resetPassword
} = require('../Controller/user.controller');

const auth = require('../Controller/middleware');
const router = require('express').Router();

router.post('/userRegister', createUser);

router.post('/emailVerify', emailVerify);

router.post('/userLogin', userLogin);

router.post('/emailConfirm', emailConfirm);

router.post('/confirmCode', confirmCode);

router.post('/resetPassword', resetPassword);
module.exports = router;