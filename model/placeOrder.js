const sequelize = require("./db");
const {
    DataTypes
} = require("sequelize");
module.exports = sequelize.define(
    "placeOrder", {
        order: {
            type: DataTypes.STRING,
            allowNull: false,
            column: "订单号"
        },
        sender: {
            type: DataTypes.STRING,
            allowNull: false,
            column: "发件人信息"
        },
        receName: {
            type: DataTypes.STRING,
            allowNull: false,
            column: "收件姓名"
        },
        recePhone: {
            type: DataTypes.STRING,
            allowNull: false,
            column: "收件电话"
        },
        receAddress: {
            type: DataTypes.STRING,
            allowNull: false,
            column: "收件地址"
        },
        createTime: {
            type: DataTypes.STRING,
            allowNull: false,
            column: "订单创建时间"
        },
        remark: {
            type: DataTypes.STRING,
            allowNull: true,
            column: "备注"
        },
        orderState: {
            type: DataTypes.STRING,
            allowNull: false,
            column: "订单状态 1等发货 2发货 3退货"
        },
        createPerson: {
            type: DataTypes.INTEGER,
            allowNull: false,
            column: "添加该产品人员ID"
        }
    }, {
        createdAt: false,
        updatedAt: false,
    }
);