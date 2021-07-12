const sequelize = require("./db");
const {
    DataTypes
} = require("sequelize");
module.exports = sequelize.define(
    "role", {
        rolename: {
            type: DataTypes.STRING,
            allowNull: false,
            column:"角色菜单"
        }
    }, {
        createdAt: false,
        updatedAt: false,
    }
);