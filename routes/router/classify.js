const router = require("express").Router();
const classSer=require('../../service/classService');
router.get('/', (req, res) => {
    res.send('分类路由成功');
})
router.post('/addClass',classSer.addClass);//添加产品分类
router.post('/getClassList',classSer.getClassList)//获取产品分类
module.exports = router;