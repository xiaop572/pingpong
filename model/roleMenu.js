const sequelize = require("./db");
const {
    DataTypes
} = require("sequelize");
module.exports = sequelize.define(
    "roleMenu", {
        roleId: {
            type: DataTypes.STRING,
            allowNull: false,
            column:"角色ID"
        },
        MenuId: {
            type: DataTypes.STRING,
            allowNull: false,
            column:"菜单ID"
        }
    }, {
        createdAt: false,
        updatedAt: false,
    }
);