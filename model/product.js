const sequelize = require("./db");
const {
    DataTypes
} = require("sequelize");
module.exports = sequelize.define(
    "Product", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            column: "产品名称"
        },
        costPrice: {
            type: DataTypes.INTEGER,
            allowNull: true,
            column: "成本价格"
        },
        agencyPrice: {
            type: DataTypes.STRING,
            allowNull: true,
            column: "代理价格数组"
        },
        count: {
            type: DataTypes.STRING,
            allowNull: true,
            column: "库存"
        },
        introduce: {
            type: DataTypes.TEXT,
            allowNull: true,
            column: "产品介绍"
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