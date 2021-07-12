const jwt = require('../utile/jwt');
const config = require("../config");
const roleMenuDb = require('../model/roleMenu')
const menuDb = require('../model/menu')
const md5 = require('md5-node');
const ress = require('../utile/res')

async function getRoleMenuStateList(req, res) {
    let body = req.body;
    try {
        let menuList = await menuDb.findAll();
        let result = await roleMenuDb.findAll({
            where: {
                roleId: body.id
            }
        });
        menuList = JSON.parse(JSON.stringify(menuList));
        menuList.forEach((item, index) => {
            result.forEach(it => {
                if (parseInt(item.id) === parseInt(it.MenuId)) {
                    item.checked = true;
                    console.log(item);
                }
            })
        })
        ress(res, true, 200, "获取成功", menuList);
        return;
    } catch (e) {
        ress(res, false, 400, e);
        return;
    }
}
async function changeRoleMenuState(req, res) {
    let body = req.body;
    try {
        if (!body.state) {
            let target = await roleMenuDb.findOne({
                where: {
                    roleId: body.id,
                    MenuId: body.menuId
                }
            })
            await target.destroy();
            ress(res, true, 200, "取消成功");
        } else {
            await roleMenuDb.create({
                roleId: body.id,
                MenuId: body.menuId
            })
            ress(res, true, 200, "设置成功");
        }
    } catch (e) {

    }
}
module.exports = {
    getRoleMenuStateList,
    changeRoleMenuState
}