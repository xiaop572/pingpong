const router = require("express").Router();
const menuSer=require('../../service/menuService');
router.get('/', (req, res) => {
    res.send('menu路由成功');
})
router.post('/getMenuList',menuSer.getMenuList);//登录接口
router.post('/addMenu',menuSer.addMenu);//登录接口
module.exports = router;