const menuDb = require('../model/menu');
const {
    Op
} = require("sequelize");
const userDb = require('../model/user');
const roleMenuDb = require('../model/roleMenu');
const ress = require('../utile/res')
async function getMenuList(req, res) {
    try {
        let result = await menuDb.findAll();
        ress(res, true, 200, "获取成功", result);
        return;
    } catch (e) {
        ress(res, false, 400, e);
        return;
    }
}
async function addMenu(req, res) {
    let body = req.body;
    body.createPerson = req.personId;
    try {
        await menuDb.create(body);
        ress(res, true, 200, "添加成功");
    } catch (e) {
        ress(res, false, 400, e);
    }
}
async function getMenu(req, res) {
    console.log(req.personId);
    try {
        //查找该用户信息
        let person = await userDb.findOne({
            where: {
                id: req.personId
            }
        })
        //该用户通过角色获取角色菜单
        let menus = await roleMenuDb.findAll({
            where: {
                roleId: person.power
            }
        })
        let inArr = [];
        menus.forEach(item => {
            inArr.push(parseInt(item.MenuId))
        })
        //获取角色下所有菜单
        let menuList = await menuDb.findAll({
            where: {
                id: {
                    [Op.in]: inArr
                }
            }
        })
        //序列化菜单
        let result = sortClassList(menuList);
        ress(res, true, 200, "获取成功", result);
    } catch (e) {
        ress(res, false, 400, e);
    }
}
/**
 * 
 * @param {*} classList 
 */
function sortClassList(classList) {
    let data = classList.map(item => {
        return item.toJSON()
    }); //sql实例转成对象
    let newArr = [];
    let filterArr = []; //保存push过的数组等待清除
    data.forEach((item, index) => {
        if (item.parent == null) { //找出父级
            newArr.push({
                ...item
            })
            filterArr.push(index)
        }
    })
    filterArr.reverse() //倒序 防止splice 错误
    filterArr.forEach(item => { //过滤掉已经push的对象
        data.splice(item, 1)
    })
    newArr.forEach(item => { //循环递归找子级
        deepAddChildren(item, data);
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
    getMenuList,
    addMenu,
    getMenu
}