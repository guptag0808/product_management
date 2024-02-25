// models/product.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const {ProductType} = require("./productType")

const Product = sequelize.define('Product', {
  itemName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  itemCode: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  ProductTypeId: {
    type: DataTypes.INTEGER, // Assuming your ProductTypeId is of type INTEGER
    references: {
      model: ProductType,
      key: 'id',
    },
  }
});

Product.belongsTo(ProductType);
sequelize.sync({logging: false}).then(() => {
	
  });
  
module.exports = {Product};
