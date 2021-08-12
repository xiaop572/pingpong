const router = require("express").Router();
const placeOrderService=require('../../service/placeOrderService');
router.get('/', (req, res) => {
    res.send('下单路由成功');
})
router.post('/explainAddress',placeOrderService.explainAddress)//一键填充接口
router.post('/createOrder',placeOrderService.createOrder)//创建订单
module.exports = router;