const jwt = require('../utile/jwt');
const config = require("../config");
const userDb = require('../model/user')
const md5 = require('md5-node');
async function login(req, res) {
    let body = req.body;
    let result = await userDb.findOne({ //查询用户账号密码是否匹配
        where: {
            username: body.username,
            password: md5(body.password)
        }
    })
    if (!result) {
        res.send({
            success: false,
            msg: "密码错误",
            code: 510
        })
        return;
    } else {
        let token = jwt.createToken({ //登录成功创建token
            username: body.username
        })
        let data = result.toJSON();
        res.send({
            success: true,
            msg: "登录成功",
            code: 200,
            data: {
                token,
                userInfo: {
                    username: data.username,
                    power: data.power,
                    level: data.level
                }
            }
        })
        return;
    }
}

async function getUserInfo(req, res) {
    let token = req.headers.token;
    if (!token) {
        res.send({
            success: false,
            msg: "token为空",
            code: 451
        })
        return;
    }
    let jwtParams = jwt.decodeToken(token); //解析token
    let result = await userDb.findOne({ //token的用户名获取用户数据
        where: {
            username: jwtParams.username
        }
    });
    let data = result.toJSON();
    res.send({
        success: true,
        msg: "获取用户数据成功",
        code: 200,
        data: {
            userInfo: {
                username: data.username,
                power: data.power,
                level: data.level
            }
        }
    })
}
module.exports = {
    login,
    getUserInfo
}