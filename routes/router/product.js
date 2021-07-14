const router = require("express").Router();
const proSer=require('../../service/productService');
router.get('/', (req, res) => {
    res.send('user路由成功');
})
router.post('/addProduct',proSer.addProduct);//登录接口
router.post('/getProduct',proSer.getProduct);//获取用户数据
router.post('/SearchProduct',proSer.SearchProduct);//获取用户数据
module.exports = router;