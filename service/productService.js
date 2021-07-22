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
async function SearchProduct(req, res) {
    try {
        let body = req.body;
        let page = body.page ? body.page : 1; //当前页数
        let size = body.size ? body.size : 10; //每页显示个数
        let data = await proDb.findAll({
            offset: (page - 1) * size,
            limit: size
        })
        let total = await proDb.count();
        let pageCount = Math.ceil(total / size); //总页数
        ress(res, true, 200, "获取成功", {
            total: total,
            currentPage: page,
            pageSize: size,
            pageCount,
            data
        });
        return;
    } catch (e) {
        ress(res, false, 400, e);
        return;
    }
}
async function recomPro(req, res) {
    try {
        let body = req.body;
        body.size = JSON.stringify(body.size);
        body.agencyPrice = JSON.stringify(body.agencyPrice);
        await proDb.update(body, {
            where: {
                id: body.id
            }
        })
        ress(res, true, 200, "修改成功");
    } catch (e) {
        ress(res, false, 400, e);
        return;
    }
}
async function delPro(req, res) {
    try {
        let body = req.body;
        await proDb.destroy({
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
async function getProductNameList(req, res) {
    try {
        let list = await proDb.findAll({
            attributes: ['name','id']
        })
        ress(res, true, 200, "获取成功", list);
    } catch (e) {
        ress(res, false, 400, e);
    }

}
module.exports = {
    addProduct,
    getProduct,
    SearchProduct,
    recomPro,
    delPro,
    getProductNameList
}