const {
    createUser
} = require('../Service/user.service');

module.exports = {
    createUser: (req, res) => {
        console.log(req.body)
    }
}