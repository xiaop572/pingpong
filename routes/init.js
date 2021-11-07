const express = require("express");
const config = require("../config.js"); //配置文件
const history = require("connect-history-api-fallback");
const app = express();
const cors = require("cors"); //跨域
const path = require('path');
require('./intercept')(app);
require('../socket/init')(app);
const cookieParser = require('cookie-parser');
const staticPath = path.resolve(__dirname, '../client/dist'); //静态路径
app.use(history({
    rewrites: [{
      from: /^\/api\/.*$/,
      to: function (context) {
        return context.parsedUrl.path
      }
    }]
  }));
app.use(express.static(staticPath)); //静态文件
// 解析 application/x-www-form-urlencoded 格式的请求体
app.use(express.urlencoded({
    extended: true
}));
//解析json格式请求体
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api/user', require('./router/user')); //加载用户路由
app.use('/api/classify', require('./router/classify')); //加载产品分类路由
app.use('/api/product', require('./router/product')); //加载产品分类路由
app.use('/api/menu', require('./router/menu')); //加载菜单路由
app.use('/api/role', require('./router/role')); //加载角色路由
app.use('/api/roleMenu', require('./router/roleMenu')); //加载角色菜单路由
app.use('/api/agency', require('./router/agency')); //加载菜单路由
app.use('/api/placeOrder', require('./router/placeOrder')); //加载下单路由
app.use('/api/logistics', require('./router/logistics')); //加载单号路由
app.use('/api/address', require('./router/address')); //加载地址薄路由
app.get('/app-state', (req, res) => { //测试服务器成功接口
    res.send("服务器启动成功！");
})

app.listen(config.port, () => {
    console.log(`${config.port}端口启动成功`);
})