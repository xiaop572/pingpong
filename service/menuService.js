const menuDb = require('../model/menu');
const ress = require('../utile/res')
async function getMenuList(req,res){
    try{
        let result=await menuDb.findAll();
        console.log(result);
        ress(res, true, 200,"获取成功",result);
        return;
    }catch(e){
        ress(res, false, 400, e);
        return;
    }
}
module.exports={
    getMenuList
}