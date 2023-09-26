const Product = require('../models/product');
exports.postAddProduct = async (req, res, next) => {

  console.log("user",req.user)
  try {
    const { title, imageUrl, price, description } = req.body;
   const product =  new Product ({
    title  : title,
    price  : price,
    description  : description,
    imageUrl : imageUrl,
    userId : req.user, // mangoose automatically get the id from the user it's own
    // userId : req.user._id
   });
   console.log(product)
   await product.save(); //this is provided by the mangoose
    res.status(201).json({message : "itemadded successfully"})
  } catch (err) {
  console.log(err);
   res.status(500).json({err : "internal server error"})
  }
};

exports.getEditProduct = async (req, res, next) => {
  try {
    const prodId = req.params.productId;
    console.log(prodId);
    const product = await Product.findById(prodId); // iff we pass string mongoose will convert automaticaly into the object string
    console.log("return product")
    res.status(201).json(product)
  }
   catch (err) {
    console.log(err)
       res.status(500).json({err : 'intenal server error'});
  }
};

exports.postEditProduct = async (req, res, next) => {
  try {
    console.log("this is the pprodId");
    const prodId = req.body.productId;
    console.log(prodId)
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDesc = req.body.description;
    
    // this is the method is give by the mangose but this is the simple method to use ++++++++%+++++
 const product = await Product.findById(prodId);
 product.title = updatedTitle;
 product.price = updatedPrice;
 product.description = updatedDesc;
 product.imageUrl = updatedImageUrl;
 const result = await product.save()
   console.log("UPDATED PRODUCT!");
   res.status(200).json("This is updated");
  } catch (err) {
      res.status(500).json({err : 'intenal server error'})
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    let products = await Product.find()
    // .populate('userId');
    console.log(products)
    res.status(201).json(products); // this is line no 61
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: 'internal server error' });
  }
};

exports.postDeleteProduct = async (req, res, next) => {
  console.log("I am here bro")
  try {
    const prodId = req.query.productId;
    console.log(prodId)
     const result = await Product.findOneAndRemove(prodId)
     console.log(result);
       res.status(200).json({messge : "Deleted Successfully"});
      
      } catch (err) {
      res.status(500).json({err : 'intenal server error'})
  }
};
