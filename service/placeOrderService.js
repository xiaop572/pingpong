const proDb = require('../model/product');
const orderProductDb = require('../model/orderProduct')
const placeOrderDb = require('../model/placeOrder')
const userDb = require('../model/user')
const sequelize = require('../model/db')
const ress = require('../utile/res')
var appId = '109637';
var method = 'cloud.address.resolve';
JSON.stringify
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
    let moneySum = 0;
    body.productList.forEach(async item => {
      if (item.id) {
        let pro = await proDb.findOne({
          where: {
            id: item.id
          }
        })
        moneySum += item.price;
        await orderProductDb.create({
          number: item.number ? item.number : 1,
          order: orderCode,
          productId: item.id,
          remark: item.remark,
          name: item.name,
          price: item.price,
          cost: pro.costPrice
        })
      }
    })
    let user = await userDb.findOne({
      where: {
        id: req.personId
      }
    })
    user.debt+=moneySum;
    user.save();
    console.log(user.debt,moneySum,"user")
    
    ress(res, true, 200, "添加成功");
  } catch (error) {
    ress(res, false, 400, error);
  }
}
async function getOrderListSearch(req, res) {
  try {
    let body = req.body;
    console.log(req.personId)
    let page = body.page ? body.page : 1; //当前页数
    let size = body.size ? body.size : 10; //每页显示个数
    let data = await placeOrderDb.findAll({
      where: {
        orderState: body.orderState
      },
      offset: (page - 1) * size,
      limit: size,
      order: [
        ['createTime', 'desc']
      ]
    })
    let total = await placeOrderDb.count({
      where: {
        orderState: body.orderState
      }
    });
    let pageCount = Math.ceil(total / size); //总页数
    ress(res, true, 200, "获取成功", {
      total: total,
      currentPage: page,
      pageSize: size,
      pageCount,
      data
    });
    return;
  } catch (e) {
    ress(res, false, 400, e);
    return;
  }
}
async function getOrderPro(req, res) {
  try {
    let body = req.body;
    console.log(body.order);
    let data = await orderProductDb.findAll({
      where: {
        order: body.order
      }
    })
    ress(res, true, 200, "获取成功", data);
    return;
  } catch (e) {
    ress(res, false, 400, e);
    return;
  }
}
async function getOrderListShipped(req, res) {
  try {
    let body = req.body;
    let page = body.page ? body.page : 1; //当前页数
    let size = body.size ? body.size : 10; //每页显示个数
    let data = await sequelize.query('select placeOrders.order,placeOrders.sender,placeOrders.receName,placeOrders.recePhone,placeOrders.receAddress,placeOrders.orderState,logistics.OrderCode,logistics.createTime as logisticsTime,placeOrders.createTime as placeTime from placeOrders,logistics where placeOrders.order=logistics.OrderId and orderState=?  order by placeOrders.createTime desc limit ? offset ?', {
      replacements: [body.orderState, size, (page - 1) * size]
    });
    // let data = await placeOrderDb.findAll({
    //   where: {
    //     orderState: body.orderState
    //   },
    //   offset: (page - 1) * size,
    //   limit: size,
    //   order: [
    //     ['createTime', 'desc']
    //   ]
    // })

    let total = await placeOrderDb.count({
      where: {
        orderState: body.orderState
      }
    });
    let pageCount = Math.ceil(total / size); //总页数
    ress(res, true, 200, "获取成功", {
      total: total,
      currentPage: page,
      pageSize: size,
      pageCount,
      data: data[0]
    });
    return;
  } catch (e) {
    ress(res, false, 400, e);
    return;
  }
}
async function getmyOrderList(req, res) {
  console.log(req.personId)
  try {
    let personId = req.personId;
    let body = req.body;
    let page = body.page ? body.page : 1; //当前页数
    let size = body.size ? body.size : 10; //每页显示个数
    let data = await sequelize.query('select placeOrders.order,placeOrders.sender,placeOrders.receName,placeOrders.recePhone,placeOrders.receAddress,placeOrders.orderState,logistics.OrderCode,logistics.createTime as logisticsTime,placeOrders.createTime as placeTime from placeOrders LEFT JOIN logistics ON placeOrders.order=logistics.OrderId where placeOrders.createPerson=?   order by placeOrders.createTime desc limit ? offset ?', {
      replacements: [personId, size, (page - 1) * size, ]
    });
    let total = await placeOrderDb.count({
      where: {
        createPerson: personId
      }
    });
    let pageCount = Math.ceil(total / size); //总页数
    ress(res, true, 200, "获取成功", {
      total: total,
      currentPage: page,
      pageSize: size,
      pageCount,
      data: data[0]
    });
    return;
  } catch (e) {
    ress(res, false, 400, e);
    return;
  }
}
async function readOrder(req, res) {
  try {
    let body = req.body;
    let data = await placeOrderDb.findOne({
      where: {
        id: body.id
      }
    })
    data.readState = 1;
    data.save()
    ress(res, true, 200, "成功");
    return;
  } catch (e) {
    ress(res, false, 400, e);
    return;
  }
}
module.exports = {
  explainAddress,
  createOrder,
  getOrderListSearch,
  getOrderPro,
  getOrderListShipped,
  getmyOrderList,
  readOrder
}