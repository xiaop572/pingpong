const sequelize = require("./db");
const {
    DataTypes
} = require("sequelize");
module.exports = sequelize.define(
    "Menu", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            column: "菜单名"
        },
        path: {
            type: DataTypes.STRING,
            allowNull: true,
            column: "路径"
        },
        parent: {
            type: DataTypes.STRING,
            allowNull: true,
            column: "父级"
        },
        createPerson:{
            type: DataTypes.STRING,
            allowNull: true,
            column: "创建菜单人员ID"
        }
    }, {
        createdAt: false,
        updatedAt: false,
    }
);