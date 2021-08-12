const sequelize = require("./db");
const {
    DataTypes
} = require("sequelize");
module.exports = sequelize.define(
    "orderProduct", {
        order: {
            type: DataTypes.STRING,
            allowNull: false,
            column: "订单号"
        },
        productId: {
            type: DataTypes.STRING,
            allowNull: false,
            column: "产品id"
        },
        number: {
            type: DataTypes.INTEGER,
            allowNull: true,
            column: "产品数量"
        },
        remark: {
            type: DataTypes.STRING,
            allowNull: true,
            column: "产品备注"
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: true,
            column: "产品价格"
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
            column: "产品名"
        },
        proState: {
            type: DataTypes.TEXT,
            allowNull: true,
            column: "产品状态 1下单 2发货 3退货"
        },
    }, {
        createdAt: false,
        updatedAt: false,
    }
);