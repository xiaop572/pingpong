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
        },
        OrderImg:{
            type:DataTypes.TEXT('long'),
            allowNull:true,
            column:"快递单号base64"
        },
        createTime: {
            type: DataTypes.STRING,
            allowNull: false,
            column: "订单创建时间"
        },
    }, {
        createdAt: false,
        updatedAt: false,
    }
);