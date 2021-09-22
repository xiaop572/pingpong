const router = require("express").Router();
const addressSer = require('../../service/addressService');
router.get('/', (req, res) => {
    res.send('地址薄路由成功');
})
router.post('/getAddressList', addressSer.getAddressList) //获取地址列表
router.post('/addAddress', addressSer.addAddress) //添加地址
router.post('/delAddress', addressSer.delAddress) //删除地址
module.exports = router;