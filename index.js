const express= require('express')
const {productRouter}  = require("./routes/productRouter")

const {ProductType} = require("./model/productType")
const {Product} = require("./model/product")
const {authRouter}= require("./routes/userRouter")
const app= express()

app.use(express.json())

app.use("/user",authRouter)
app.use("/product",productRouter)
app.get("/",(req,res)=>{
	res.send('This is my home page')
})  
 
 

 

  
  app.get('/category/:typeName', async (req, res) => {
	try {
		
	  const { typeName } = req.params;
	  
	  // Find the product type
	  const productType = await ProductType.findOne({
		where: { typeName },
		include: Product, // Include associated products
	  });
	  console.log(productType)
	  if (!productType) {
		return res.status(404).json({ error: 'Product type not found' });
	  }
  
	  // Extract only relevant product information
	  const products = productType.Products.map((product) => ({
		itemName: product.itemName,
		itemCode: product.itemCode,
	  }));
  
	  res.json({ category: typeName, products });
	} catch (error) {
	  console.error('Error getting products by category:', error);
	  res.status(500).json({ error: 'Internal Server Error' });
	}
  });


app.listen(7000,()=>{
	 
	console.log("server is runnning")
})