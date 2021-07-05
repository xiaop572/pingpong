const router = require("express").Router();
const userSer=require('../../service/userService');
router.get('/', (req, res) => {
    res.send('user路由成功');
})
router.post('/login',userSer.login);//登录接口
router.post('/getUserInfo',userSer.getUserInfo);//获取用户数据
module.exports = router;