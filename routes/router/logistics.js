const router = require("express").Router();
const logisticsSer=require('../../service/logisticsService');
router.get('/', (req, res) => {
    res.send('menu路由成功');
})
router.post('/getOdd',logisticsSer.getOdd);//获取快递电子单号
router.post('/getOddImg',logisticsSer.getOddImg);//获取快递电子单号图片
module.exports = router;