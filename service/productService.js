const proDb = require('../model/product');
const userDb = require('../model/user')
const classifyDb = require('../model/classify')
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
        let user = await userDb.findOne({
            where: {
                id: req.personId
            }
        })
        let list = await proDb.findAll({
            attributes: ['name', 'id', 'agencyPrice']
        })
        let newArr = []
        //数据库查询标准数组化
        newArr = list.map(item => {
            return item.toJSON();
        })
        newArr.forEach(item => {
            let agen = JSON.parse(item.agencyPrice);
            agen.forEach(it => {
                if (parseInt(it.level) === parseInt(user.level)) {
                    item.price = it.price;
                }
            })
            delete item.agencyPrice;
        })
        ress(res, true, 200, "获取成功", newArr);
    } catch (e) {
        ress(res, false, 400, e);
    }

}
async function channelExcel(req,res){
    try {
        let body = req.body;
        body.createPerson = req.personId;
        body.excelList.forEach(async item=>{
            let proClass=await classifyDb.findOne({
                where:{
                    name:item['产品分类'],
                    parent:body.value[0]
                }
            })
            let daiArr=[]
            for(it in item){
                if(it.indexOf('代理')>=0){
                    let level=it.split('代理')[1];
                    daiArr.push({
                        name:it,level,price:item[it]
                    })
                }
            }
            await proDb.create({
                name:item['产品名称'],
                count:item['库存'],
                classify:proClass.id,
                costPrice:item['成本价'],
                agencyPrice:JSON.stringify(daiArr),
                createPerson:body.createPerson 
            })
        })
        ress(res,true,200,"导入成功")
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
    getProductNameList,
    channelExcel
}