const sequelize = require("./db");
const {
    DataTypes
} = require("sequelize");
module.exports = sequelize.define(
    "Address", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            column: "姓名"
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            column: "手机"
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
            column: "地址"
        },
        createPerson: {
            type: DataTypes.INTEGER,
            allowNull: false,
            column: "创建人"
        }
    }, {
        createdAt: false,
        updatedAt: false,
    }
);