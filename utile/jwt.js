const jwt = require('jsonwebtoken');
const config=require('../config')
/**
 * 
 * @param {*token用户信息} option 
 */
module.exports = {
    createToken: function (option) {
        const token = jwt.sign(option, config.tokenSecrect, {
            expiresIn: 3600
        })
        return token;
    },
    verifyToken: function (token) {
        jwt.verify(token, config.tokenSecrect);
    },
    decodeToken:function(token){
        return jwt.decode(token)
    }
}