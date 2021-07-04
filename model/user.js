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
            column:"权限"
        }
    }, {
        createdAt: false,
        updatedAt: false,
    }
);