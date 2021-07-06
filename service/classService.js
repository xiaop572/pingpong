const classifyDb = require('../model/classify');

const ress = require('../utile/res')
async function addClass(req, res) {
    let body = req.body;
    if (!body.name) {
        ress(res, false, 400, "分类名称为空");
        return;
    }
    const cla = await classifyDb.create({
        name: body.name,
        parent: body.parent ? body.parent : null
    })
    ress(res, true, 200, "添加成功");
}
async function getClassList(req, res) {
    let classList = await classifyDb.findAll();
    ress(res, true, 200, "获取成功", classList);
}
async function sortClassList(classList){
    let result=await classifyDb.findAll();
    let data=result.map(item=>{
        return item.toJSON()
    });//sql实例转成对象
}
sortClassList()
module.exports = {
    addClass,
    getClassList
}