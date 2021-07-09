const proDb = require('../model/product');
const ress = require('../utile/res')
async function addProduct(req, res) {
    const body = req.body;
    body.size = JSON.stringify(body.size);
    body.agencyPrice = JSON.stringify(body.agencyPrice);
    body.createPerson = req.personId;
    try {
        const result = await proDb.create(body);
        if (result) {
            ress(res, true, 200, "添加成功");
            return;
        }
    } catch (e) {
        console.log(e);
        ress(res, false, 400, e);
        return;
    }


}
async function getProduct(req, res) {

}
module.exports = {
    addProduct,
    getProduct
}