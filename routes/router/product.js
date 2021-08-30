const router = require("express").Router();
const proSer=require('../../service/productService');
router.get('/', (req, res) => {
    res.send('user路由成功');
})
router.post('/addProduct',proSer.addProduct);//登录接口
router.post('/getProduct',proSer.getProduct);//获取用户数据
router.post('/SearchProduct',proSer.SearchProduct);//搜索获取用户数据
router.post('/recomPro',proSer.recomPro);//修改产品
router.post('/delPro',proSer.delPro);//删除产品
router.post('/getProductNameList',proSer.getProductNameList);//删除产品
router.post('/channelExcel',proSer.channelExcel);//导入excel
module.exports = router;