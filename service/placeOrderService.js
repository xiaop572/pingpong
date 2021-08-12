const proDb = require('../model/placeOrder');
const orderProductDb = require('../model/orderProduct')
const placeOrderDb = require('../model/placeOrder')
const ress = require('../utile/res')
var appId = '109637';
var method = 'cloud.address.resolve';

var appKey = '2fdeeac6cfb841dd94a575c2c5dd65041bcc9d44';
var request = require("request");

async function explainAddress(req, res) {
  var ts = Date.now();
  // 计算签名
  var signStr = appId + method + ts + appKey;
  var crypto = require('crypto');
  var h = crypto.createHash('md5');
  h.update(signStr);
  var sign = h.digest('hex');
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
      data: JSON.stringify({
        "text": req.body.keyfillValue,
        "multimode": false
      }),
    }
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    let bodys = JSON.parse(body);
    if (bodys.code === 0) {
      ress(res, true, 200, bodys.msg, bodys.data);
    } else {
      ress(res, false, 400, bodys.msg, bodys.data);
    }
  });

}
async function createOrder(req, res) {
  try {
    let body = req.body;
    let ran = Math.floor(Math.random() * 888888 + 1000000);
    let orderCode = new Date().getTime() + ran;
    await placeOrderDb.create({
      order: orderCode,
      sender: body.sender,
      receName: body.receName,
      recePhone: body.recePhone,
      receAddress: body.receAddress,
      createTime: +new Date(),
      remark: body.remark.join(","),
      orderState: "1",
      createPerson: req.personId
    })
    body.productList.forEach(async item => {
      if (item.id) {
        await orderProductDb.create({
          number: item.number ? item.number : 1,
          order: orderCode,
          productId: item.id,
          remark: item.remark,
          name: item.name,
          price: item.price
        })
      }
    })
    ress(res, true, 200, "添加成功");
  } catch (error) {
    ress(res, false, 400, error);
  }
}
module.exports = {
  explainAddress,
  createOrder
}