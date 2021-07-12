const router = require("express").Router();
const roleMenuSer=require('../../service/roleMenuService');
router.get('/', (req, res) => {
    res.send('menu路由成功');
})
router.post('/getRoleMenuStateList',roleMenuSer.getRoleMenuStateList);//获取菜单接口roleMenu
router.post('/changeRoleMenuState',roleMenuSer.changeRoleMenuState);//获取菜单接口roleMenu
module.exports = router;