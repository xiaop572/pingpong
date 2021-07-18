const agencyDb = require('../model/agency');

const ress = require('../utile/res')
async function getAgencyList(req,res){
    try {
        let agencyList = await agencyDb.findAll();
        ress(res, true, 200, "获取成功", agencyList);
    } catch (error) {
        ress(res, false, 400, e);
        return;
    }
}
module.exports = {
    getAgencyList
}