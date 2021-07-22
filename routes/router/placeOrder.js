const router = require("express").Router();
const placeOrderService=require('../../service/placeOrderService');
router.get('/', (req, res) => {
    res.send('下单路由成功');
})
router.post('/explainAddress',placeOrderService.explainAddress)
module.exports = router;