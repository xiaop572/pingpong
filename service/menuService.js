const menuDb = require('../model/menu');
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
module.exports = {
    getMenuList,
    addMenu
}