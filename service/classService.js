const classifyDb = require('../model/classify');

const ress = require('../utile/res')
async function addClass(req, res) {
    let body = req.body;
    if (!body.name) {
        ress(res, false, 400, "分类名称为空");
        return;
    }
    const cla = await classifyDb.create({
        createPerson: req.personId,
        name: body.name,
        parent: body.parent ? body.parent : null
    })
    ress(res, true, 200, "添加成功");
}
async function getClassList(req, res) {
    let classList = await classifyDb.findAll();
    let newArr = sortClassList(classList);
    ress(res, true, 200, "获取成功", newArr);
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
    addClass,
    getClassList
}