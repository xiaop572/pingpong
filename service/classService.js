const classifyDb = require('../model/classify');

async function addClass(req, res) {
    let body = req.body;
    if (!body.name) {
        res.send({
            success: false,
            msg: "分类名称为空",
            code: 400
        })
        return;
    }
    const cla = await classifyDb.create({
        name: body.name,
        parent: body.parent ? body.parent : ''
    })
    res.send({
        success: true,
        msg: "添加成功",
        code: 200
    })

}
module.exports = {
    addClass
}