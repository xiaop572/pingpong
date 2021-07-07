const sequelize = require("./db");
const {
    DataTypes
} = require("sequelize");
module.exports = sequelize.define(
    "Classify", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            column:"分类名称"
        },
        parent: {
            type: DataTypes.INTEGER,
            allowNull: true,
            column:"父级分类"
        },
        createPerson:{
            type: DataTypes.INTEGER,
            allowNull: false,
            column:"添加该分类人员ID"
        }
    }, {
        createdAt: false,
        updatedAt: false,
    }
);