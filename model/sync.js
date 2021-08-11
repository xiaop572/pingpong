// 同步所有模型
require("./user");//用户表
require("./classify")//分类表
require("./agency")//代理等级表
require("./product")//产品表
require("./menu")//菜单表
require("./role")//角色表
require("./roleMenu")//角色菜单表
require("./placeOrder")//订单表
require("./orderProduct")//订单产品表
const sequelize = require("./db");
sequelize.sync({ alter: true }).then(() => {
  console.log("所有模型同步完成");
});
