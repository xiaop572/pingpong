const sequelize = require("./db");
const {
    DataTypes
} = require("sequelize");
module.exports = sequelize.define(
    "User", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            column:"用户名"
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            column:"密码"
        },
        power:{
            type: DataTypes.STRING,
            allowNull: false,
            column:"用户菜单权限"
        },
        level:{
            type: DataTypes.STRING,
            allowNull: false,
            column:"代理等级"
        }
    }, {
        createdAt: false,
        updatedAt: false,
    }
);