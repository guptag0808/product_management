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
// if (ProductType && ProductType.prototype instanceof sequelize.Model) {
// 	Product.belongsTo(ProductType);
//   } else {
// 	console.error('Invalid ProductType model');
//   }
Product.belongsTo(ProductType);
sequelize.sync().then(() => {
	console.log('Models synchronized with the database.');
  });
  
module.exports = {Product};
