const router = require("express").Router();
const placeOrderService=require('../../service/placeOrderService');
router.get('/', (req, res) => {
    res.send('下单路由成功');
})
router.post('/explainAddress',placeOrderService.explainAddress)//一键填充接口
router.post('/createOrder',placeOrderService.createOrder)//创建订单
router.post('/getOrderListSearch',placeOrderService.getOrderListSearch);//获取订单状态
router.post('/getOrderPro',placeOrderService.getOrderPro);//订单物品清单
router.post('/getOrderListShipped',placeOrderService.getOrderListShipped);//发货状态列表
router.post('/getmyOrderList',placeOrderService.getmyOrderList);//我的订单列表
module.exports = router;