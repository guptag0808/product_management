const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');


const ProductType = sequelize.define('ProductType', {
  typeName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});
sequelize.sync({ force: false , logging: false }).then(async () => {
  const { Product } = require("./product");
  ProductType.hasMany(Product);
  
});

module.exports={ProductType}
