const logisticsDb = require('../model/logistics')
const config = require('../config')
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
        if (result) {
            ress(res, true, 200,"获取单号成功", {
                kuaidinum: result.OrderCode
            })
            return;
        }
        let sender = body.sender;
        let senderArr = sender.split(' ');
        let key = "XJZdhhWY8529";
        let t = +new Date();
        let secret = "51cc2c7eba444ab8b3eab7f988e3713b";
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
                    if (!data) {
                        throw new Error('快递单号错误')
                    }
                    await logisticsDb.create({
                        OrderId: body.order,
                        OrderCode: data.kuaidinum
                    })
                    ress(res, true, 200,"获取单号成功", {
                        kuaidinum: data.kuaidinum
                    });
                } else {
                    ress(res, false, 400, err);
                }
            })
    } catch (error) {
        ress(res, false, 400, error);
    }
}
module.exports = {
    getOdd
}