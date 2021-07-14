const router = require("express").Router();
const roleMenuSer=require('../../service/roleMenuService');
router.get('/', (req, res) => {
    res.send('menu路由成功');
})
router.post('/getRoleMenuStateList',roleMenuSer.getRoleMenuStateList);//获取菜单接口roleMenu
router.post('/changeRoleMenuState',roleMenuSer.changeRoleMenuState);//修改角色菜单
module.exports = router;