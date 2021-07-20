require('./model/init'); //模型初始化
require("./routes/init"); //路由初始化 服务启动
const fs = require('fs')
// var request = require("request");

// var appId = '109636';
// var method = 'cloud.address.resolve';
// var ts = Date.now();
// var appKey = '9d1794405e7d11649abd0037ebdecc23e489ff72';

// // 计算签名
// var signStr = appId + method + ts + appKey;
// var crypto = require('crypto');
// var h = crypto.createHash('md5');
// h.update(signStr);
// var sign = h.digest('hex');

// // data参数是个json格式的字符串
// var options = {
//     method: 'POST',
//     url: 'https://kop.kuaidihelp.com/api',
//     headers: {
//         'cache-control': 'no-cache',
//         'content-type': 'application/x-www-form-urlencoded'
//     },
//     form: {
//         app_id: appId,
//         method: method,
//         ts: ts,
//         sign: sign,
//         data: JSON.stringify({
//             "text": "温州大学 13905857430  衣服  食物 ",
//             "multimode": false
//         }),
//     }
// };

// request(options, function (error, response, body) {
//     if (error) throw new Error(error);

//     console.log(body);
// });