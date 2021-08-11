require('./model/init'); //模型初始化
require("./routes/init"); //路由初始化 服务启动
const fs = require('fs')
const md5 = require('md5-node');
var request = require("request");
var appId = '109636';
var method = 'cloud.address.resolve';
var ts = Date.now();
var appKey = '9d1794405e7d11649abd0037ebdecc23e489ff72';

// 计算签名
var signStr = appId + method + ts + appKey;
var crypto = require('crypto');
var h = crypto.createHash('md5');
h.update(signStr);
var sign = h.digest('hex');
let dizhi = {
    "text": "温州大学 13905857430  衣服  食物 ",
    "multimode": false
}
let danhao = {
    "order_id": "yhai123456",
    "shipper_type": 'yt',
    "pay_type": 3,
    "trade_name": "测试专用",
    "weight": 1,
    "quantity": 1,
    "volume": 1,
    "month_no": "K57786860",
    "sender": {
        "company": "南山区深圳软件产业基地",
        "name": "张飞鸿",
        "tel": "",
        "mobile": "18688888888",
        "province": "广东省",
        "city": "深圳市",
        "district": "南山区",
        "address": "深圳软件产业基地"
    },
    "recipient": {
        "company": "宝芝林贸易",
        "name": "王三姨",
        "tel": "95127777",
        "mobile": "13666666666",
        "province": "江苏省",
        "city": "苏州市",
        "district": "沧浪区",
        "address": "人民路沧浪亭街31号宝芝林贸易有限公司"
    },
    "customer_name": "K57786860",
    "customer_password": "Ahs8IQjt"
}
// data参数是个json格式的字符串
var options = {
    method: 'POST',
    url: 'https://kop.kuaidihelp.com/api',
    headers: {
        'cache-control': 'no-cache',
        'content-type': 'application/x-www-form-urlencoded'
    },
    form: {
        app_id: appId,
        method: method,
        ts: ts,
        sign: sign,
        data: JSON.stringify(danhao),
    }
};

request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
});