const router = require("express").Router();
const agencySer=require('../../service/agencyService');
router.get('/', (req, res) => {
    res.send('代理路由成功');
})
router.post('/getAgencyList',agencySer.getAgencyList)//删除产品分类
module.exports = router;