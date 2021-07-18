const jwt = require('../utile/jwt');
const config = require("../config");
const userDb = require('../model/user')
const md5 = require('md5-node');
const ress = require('../utile/res')
async function login(req, res) {
    let body = req.body;
    let result = await userDb.findOne({ //查询用户账号密码是否匹配
        where: {
            username: body.username,
            password: md5(body.password)
        }
    })
    if (!result) {
        ress(res, false, 510, "密码错误");
        return;
    } else {
        let data = result.toJSON();
        let token = jwt.createToken({ //登录成功创建token
            id: data.id,
            username: body.username
        })
        ress(res, true, 200, "登录成功", {
            token,
            userInfo: {
                username: data.username,
                power: data.power,
                level: data.level
            }
        });
        return;
    }
}

async function getUserInfo(req, res) {
    let token = req.headers.token;
    if (!token) {
        ress(res, false, 451, "token为空", );
        return;
    }
    let jwtParams = jwt.decodeToken(token); //解析token
    let result = await userDb.findOne({ //token的用户名获取用户数据
        where: {
            username: jwtParams.username
        }
    });
    let data = result.toJSON();
    ress(res, true, 200, "获取用户数据成功", {
        userInfo: {
            username: data.username,
            power: data.power,
            level: data.level
        }
    })
}
async function getUserList(req, res) {
    try {
        let result = await userDb.findAll();
        ress(res, true, 200, "获取成功", result);
        return;
    } catch (e) {
        ress(res, false, 400, e);
        return;
    }
}
async function changePowerInfo(req, res) {
    let body = req.body;
    try {
        await userDb.update({
            power: body.power
        }, {
            where: {
                id: body.id
            }
        });
        ress(res, true, 200, "修改成功");
        return;
    } catch (e) {
        ress(res, false, 400, e);
        return;
    }
}
async function roleList(req,res){
    
}
async function addAgency(req,res){
    try {
        let body=req.body;
        body.password=md5(body.password);
        body.power=3;
        const result = await userDb.create(body);
        if (result) {
            ress(res, true, 200, "添加成功");
            return;
        }
    } catch (e) {
        console.log(e);
        ress(res, false, 400, e);
        return;
    }
}
module.exports = {
    login,
    getUserInfo,
    getUserList,
    changePowerInfo,
    roleList,
    addAgency
}