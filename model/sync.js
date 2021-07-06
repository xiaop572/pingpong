// 同步所有模型
require("./user");//用户表
require("./classify")//分类表
const sequelize = require("./db");
sequelize.sync({ alter: true }).then(() => {
  console.log("所有模型同步完成");
});
