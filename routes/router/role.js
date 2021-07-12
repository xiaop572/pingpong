const router = require("express").Router();
const roleSer=require('../../service/roleService');
router.get('/', (req, res) => {
    res.send('user路由成功');
})
router.post('/getRoleList',roleSer.getRoleList);//获取角色列表
module.exports = router;