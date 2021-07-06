/**
 * 封装响应事件
 * @param {*} res 
 * @param {*} success 
 * @param {*} code 
 * @param {*} msg 
 * @param {*} data 
 */
module.exports=function(res,success,code,msg,data){
    res.send({
        success,
        code,
        msg,
        data
    })
}
