const sequelize = require("./db");
const {
    DataTypes
} = require("sequelize");
module.exports = sequelize.define(
    "Agency", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            column:"代理等级"
        },
    }, {
        createdAt: false,
        updatedAt: false,
    }
);