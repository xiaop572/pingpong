const jwt = require('../utile/jwt');
const config = require("../config");
const roleDb = require('../model/role')
const md5 = require('md5-node');
const ress = require('../utile/res')

async function getRoleList(req, res) {
    try {
        let result = await roleDb.findAll();
        ress(res, true, 200, "获取成功",result);
        return;
    } catch (e) {
        ress(res, false, 400, e);
        return;
    }
}

module.exports = {
    getRoleList
}