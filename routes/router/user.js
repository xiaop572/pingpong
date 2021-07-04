const router = require("express").Router();
router.get('/', (req, res) => {
    res.send('user路由成功');
})
module.exports = router;