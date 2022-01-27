const router = require("express").Router();
const userSer=require('../../service/userService');
router.get('/', (req, res) => {
    res.send('user路由成功');
})
router.post('/login',userSer.login);//登录接口
router.post('/getUserInfo',userSer.getUserInfo);//获取用户数据
router.post('/getUserList',userSer.getUserList);//获取用户列表
router.post('/changePowerInfo',userSer.changePowerInfo);//修改用户权限信息
router.post('/roleList',userSer.roleList);//获取角色列表
router.post('/addAgency',userSer.addAgency);//添加代理
router.post('/getAgency',userSer.getAgency);//获取代理商
module.exports = router;