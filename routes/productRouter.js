const express= require('express')
const productRouter = express.Router()
const {ProductType} = require("../model/productType")
const {Product} = require("../model/product")
const {authentication} = require("../middleware/authMiddleware")

// add new product
productRouter.post('/create', async (req, res) => {
	try {
	  const { itemName, itemCode, typeName } = req.body;
  
	  // Find or create the product type
	  const [productType] = await ProductType.findOrCreate({
		where: { typeName },
	  });
  
	  // Create the product with the associated product type
	  const newProduct = await Product.create({
		itemName,
		itemCode,
		ProductTypeId: productType.id,
	  });
  
	  res.status(201).json({ message: 'Product created successfully', product: newProduct.toJSON() });
	} catch (error) {
	  console.error('Error creating product:', error);
	  res.status(500).json({ error: 'Internal Server Error' });
	}
  });

  // Get all products
productRouter.get('/', async (req, res) => {
	try {
	  const products = await Product.findAll({
		include: ProductType, // Include associated product type
	  });
  
	  res.json(products);
	} catch (error) {
	  console.error('Error getting products:', error);
	  res.status(500).json({ error: 'Internal Server Error' });
	}
  });
  
  // Get product by ID
  productRouter.get('/:id', async (req, res) => {
	try {
	  const productId = req.params.id;
	  const product = await Product.findByPk(productId, {
		include: ProductType, 
	  });
  
	  if (!product) {
		return res.status(404).json({ error: 'Product not found' });
	  }
  
	  res.status(200).json(product);
	} catch (error) {
	  console.error('Error getting product by ID:', error);
	  res.status(500).json({ error: 'Internal Server Error' });
	}
  });
  
  // Update product by ID
  productRouter.put('/:id', async (req, res) => {
	try {
	  const productId = req.params.id;
	  const { itemName, itemCode, typeName } = req.body;
  
	  // Find the product
	  const product = await Product.findByPk(productId);
  
	  if (!product) {
		return res.status(404).json({ error: 'Product not found' });
	  }
  
	  // Find or create the product type
	  const [productType] = await ProductType.findOrCreate({
		where: { typeName },
	  });
  
	  // Update the product with the associated product type
	  await product.update({
		itemName,
		itemCode,
		ProductTypeId: productType.id,
	  });
  
	  res.json({ message: 'Product updated successfully', product: product.toJSON() });
	} catch (error) {
	  console.error('Error updating product:', error);
	  res.status(500).json({ error: 'Internal Server Error' });
	}
  });
  
  // Delete product by ID
  productRouter.delete('/:id', async (req, res) => {
	try {
	  const productId = req.params.id;
  
	  // Find the product
	  const product = await Product.findByPk(productId);
  
	  if (!product) {
		return res.status(404).json({ error: 'Product not found' });
	  }
  
	  // Delete the product
	  await product.destroy();
  
	  res.json({ message: 'Product deleted successfully' ,"product":product });
	} catch (error) {
	  console.error('Error deleting product:', error);
	  res.status(500).json({ error: 'Internal Server Error' });
	}
  });

//   get category wise product
  productRouter.get('/category/:categoryId', async (req, res) => {
	try {
	  const categoryId = req.params.categoryId;
  
	  const products = await Product.findAll({
		include: [
		  {
			model: ProductType,
			where: { id: categoryId },
		  },
		],
	  });
  
	  res.json(products);
	} catch (error) {
	  console.error('Error getting products by category:', error);
	  res.status(500).json({ error: 'Internal Server Error' });
	}
  });

//   get product details by product name

  productRouter.get('/name/:productName', async (req, res) => {
	try {
	  const productName = req.params.productName;
  
	  const products = await Product.findAll({
		where: { itemName: productName },
		include: ProductType,
	  });
  
	  res.json(products);
	} catch (error) {
	  console.error('Error getting products by name:', error);
	  res.status(500).json({ error: 'Internal Server Error' });
	}
  });
  
  

  module.exports={
	productRouter
  }