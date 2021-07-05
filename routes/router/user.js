const router = require("express").Router();
const userSer=require('../../service/userService');
router.get('/', (req, res) => {
    res.send('user路由成功');
})
router.post('/login',userSer.login);
module.exports = router;