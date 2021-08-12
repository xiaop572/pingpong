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
async function roleList(req, res) {

}
async function addAgency(req, res) {
    try {
        let body = req.body;
        body.password = md5(body.password);
        body.power = 3;
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
async function test(req, ress) {
    var request = require("request");
    const md5 = require('md5-node');
    let key = "XJZdhhWY8529";
    let t = +new Date();
    let secret = "51cc2c7eba444ab8b3eab7f988e3713b";
    let param = {
        type: "10",
        partnerId: "K57786860",
        partnerKey: "Ahs8IQjt",
        kuaidicom: "yuantong",
        recManName: "林鹏程",
        recManMobile: "18557731771",
        recManPrintAddr: "浙江省温州市瓯海区南白象街道安盛锦园5栋502",
        sendManName: "姜浙海",
        sendManMobile: "15968751886",
        sendManPrintAddr: "浙江省温州市龙湾区天河街道永丰东路140号",
        tempid: "3468bc6bac5548709abf5652f51d076b",
        count: "1",
    }
    let sign = md5(JSON.stringify(param) + t + key + secret).toLocaleUpperCase();
    console.log(sign);
    let params = {
        url: "https://poll.kuaidi100.com/printapi/printtask.do",
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        form: {
            method: "getPrintImg",
            key,
            sign,
            t,
            param: JSON.stringify(param)
        }
    };
    request(params,
        (err, res, body) => {
            console.log(body);
            if (JSON.parse(body).data) {
                ress.send(JSON.parse(body).data.kuaidinum);
            } else {
                ress.send("失败")
            }
        })
}
module.exports = {
    login,
    getUserInfo,
    getUserList,
    changePowerInfo,
    roleList,
    addAgency,
    test
}