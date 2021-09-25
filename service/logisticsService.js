const logisticsDb = require('../model/logistics')
const orderProductDb = require('../model/orderProduct')
const config = require('../config')
const placeOrderDb = require('../model/placeOrder')
const ress = require('../utile/res')
const md5 = require('md5-node');
var request = require("request");
async function getOdd(req, res) {
    try {
        let body = req.body;
        let result = await logisticsDb.findOne({
            where: {
                OrderId: body.order
            }
        });
        if (result && result.OrderImg && result.OrderCode) {
            ress(res, true, 200, "获取单号成功", {
                kuaidinum: result.OrderCode,
                OrderImg: result.OrderImg
            })
            return;
        }

        let Prolist = await orderProductDb.findAll({
            where: {
                order: body.order
            }
        })
        let remarks = ""
        Prolist.forEach(item => {
            remarks += item.name + " " + item.remark + " 数量" + item.number + " ";
        })
        remarks = remarks + ` ${body.remark}`
        let sender = body.sender;
        let senderArr = sender.split(' ');
        let key = "XJZdhhWY8529";
        let t = +new Date();
        let param = {
            type: "10",
            partnerId: config.oddPartnerId,
            partnerKey: config.oddPartnerKey,
            kuaidicom: config.kuaidicom,
            recManName: body.receName,
            recManMobile: body.recePhone,
            recManPrintAddr: body.receAddress,
            sendManName: senderArr[0],
            sendManMobile: senderArr[1],
            sendManPrintAddr: senderArr[2],
            tempid: "3468bc6bac5548709abf5652f51d076b",
            count: "1",
            cargo: `(${remarks})`
        }
        let sign = md5(JSON.stringify(param) + t + config.oddKey + config.oddSecret).toLocaleUpperCase();
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
            async (err, resolve, bodys) => {
                if (JSON.parse(bodys).data) {
                    let data = JSON.parse(bodys).data;
                    if (!JSON.parse(bodys).result) {
                        ress(res, false, 400, JSON.parse(bodys).message);
                        return;
                    }
                    await logisticsDb.create({
                        OrderId: body.order,
                        OrderCode: data.kuaidinum,
                        OrderImg: data.imgBase64,
                        createTime: +new Date()
                    })
                    let Order = await placeOrderDb.findOne({
                        where: {
                            order: body.order
                        }
                    })
                    Order.orderState = 2;
                    Order.save()
                    ress(res, true, 200, "获取单号成功", {
                        kuaidinum: data.kuaidinum,
                        OrderImg: data.imgBase64
                    });
                } else {
                    ress(res, false, 400, err);
                }
            })
    } catch (error) {
        ress(res, false, 400, error);
    }
}
async function getOddImg(req, res) {
    try {
        let body = req.body;
        let result = await logisticsDb.findOne({
            where: {
                OrderId: body.order
            }
        });
        if (result && result.OrderImg && result.OrderCode) {
            ress(res, true, 200, "获取单号成功", {
                kuaidinum: result.OrderCode,
                OrderImg: result.OrderImg
            })
            return;
        }
    } catch (error) {
        ress(res, false, 400, err);
    }
}
module.exports = {
    getOdd,
    getOddImg
}