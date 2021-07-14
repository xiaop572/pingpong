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
                }
            })
        })
        let newArr = sortClassList(menuList)
        ress(res, true, 200, "获取成功", newArr);
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
/**
 * 
 * @param {*} classList 
 */
function sortClassList(classList) {
    let newArr = [];
    let filterArr = []; //保存push过的数组等待清除
    classList.forEach((item, index) => {
        if (item.parent == null) { //找出父级
            newArr.push({
                ...item
            })
            filterArr.push(index)
        }
    })
    newArr.forEach(item => { //循环递归找子级
        deepAddChildren(item, classList);
    })
    return newArr;
}

function deepAddChildren(obj, arr) {
    arr.forEach(item => {
        if (item.parent == obj.id) { //子级的parent等于父级id给父级添加children
            if (!obj.children) {
                obj.children = []
            }
            obj.children.push(item); //父级添加子级
            deepAddChildren(item, arr) //子级去递归添加子级
        }
    })
}
module.exports = {
    getRoleMenuStateList,
    changeRoleMenuState
}