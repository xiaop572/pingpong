const Sequelize = require('sequelize');
const config = require('../config');
const sequelize = new Sequelize('pingpong', config.username, config.password, {
    host: config.sqlPath,
    dialect: 'mysql'
});
(async function () {
    try {
        await sequelize.authenticate();
    } catch (error) {
        console.error('数据库连接失败', error);
    }
})()
module.exports=sequelize;