const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
// const {Product} = require("./product")

const ProductType = sequelize.define('ProductType', {
  typeName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});
sequelize.sync({ force: false }).then(async () => {
  const { Product } = require("./product");
  ProductType.hasMany(Product);
  console.log('Models synchronized with the database.');
});
module.exports={ProductType}
 