const sequelize = require("./db");
const {
    DataTypes
} = require("sequelize");
module.exports = sequelize.define(
    "logistics", {
        OrderId: {
            type: DataTypes.STRING,
            allowNull: false,
            column:"订单ID"
        },
        OrderCode:{
            type: DataTypes.STRING,
            allowNull: false,
            column:"快递单号"
        }
    }, {
        createdAt: false,
        updatedAt: false,
    }
);