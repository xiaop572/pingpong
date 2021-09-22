const addressDb = require('../model/address');

const ress = require('../utile/res')
async function getAddressList(req, res) {
    try {
        let addressList = await addressDb.findAll();
        ress(res, true, 200, "获取成功", addressList);
    } catch (error) {
        ress(res, false, 400, e);
        return;
    }
}
async function addAddress(req,res) {
    let body = req.body;
    try {
        const cla = await addressDb.create({
            createPerson: req.personId,
            name: body.name,
            phone: body.phone,
            address: body.address
        })
        if (cla) {
            ress(res, true, 200, "添加成功");
            return;
        }
    } catch (e) {
        console.log(e);
        ress(res, false, 400, e);
        return;
    }
}
async function delAddress(req, res) {
    try {
        let body = req.body;
        console.log(body);
        await addressDb.destroy({
            where: {
                id: body.id
            }
        });
        ress(res, true, 200, "删除成功");
    } catch (e) {
        ress(res, false, 400, e);
        return;
    }
}
module.exports = {
    getAddressList,
    addAddress,
    delAddress
}