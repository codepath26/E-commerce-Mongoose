const Product = require('../models/product');
const Order= require('../models/order');

exports.getProducts =async(req, res, next) => {
  try{  
    let products = await Product.find();
    console.log(products);
    res.status(201).json(products);
  }
  catch(err)
  {res.status(500).json({err : "internal sever erro"})}
}
exports.getProduct = async(req, res, next) => {
  try{
    const prodId =req.params.productId;
    console.log(prodId)
       let product =  await  Product.findById(prodId)
       res.status(201).json(product);
    
  }catch(err){
    res.status(500).json({err : "internal sever erro"})
  }
   
};

exports.getIndex = async(req, res, next) => {
  try{
  let products = await Product.find()
  console.log( "products",products)
   res.status(201).json(products)
  }catch(err){
    res.status(500).json({err : "internal sever erro"})
  }  
};

exports.getCart = async (req, res, next) => {
  try{

    const user = await req.user.populate('cart.items.productId');
    // execPoopulate method is dipricated or any thing else
    const products = user.cart.items;
    console.log(products);
    console.log("END get cart method")
    res.status(201).json(products);
  }catch(err){
    res.status(500).json({err : "internal sever erro"})
  } 
};




exports.postCart = async (req, res, next) => {
  try {
    console.log("at postCart method");
    console.log(req.body)
    const prodId = req.body.productId;

   const product = await Product.findById(prodId);
   console.log("product ===>",product)
   console.log("this user",req.user)
     const result = await  req.user.addToCart(product);
     console.log("result",result)
    res.status(200).json({message : "done with cart"})
  } catch(err){
    res.status(500).json({err : "internal sever erro"})
  } 
};

exports.postCartDeleteProduct =async (req, res, next) => {
  try{
      console.log(req.body.productId)
    const prodId = req.body.productId;
     const result = await req.user.removeFromCart(prodId);
     console.log(result.cart.items)
     res.status(201).json("Item Deleted successfully")
      }
  catch(err){
    res.status(500).json({err : "internal sever erro"})
  } 

    
};


exports.postOrder = async (req, res, next) => {
  try {
    console.log("at post order")
    const user = await req.user.populate('cart.items.productId');
    console.log(user);
    const products = await user.cart.items.map(i =>{
    return {quantity :i.quantity, product :{...i.productId._doc}};
    });

    const order = new Order({
      user : {
        name : req.user.name,
        userId : req.user,
      },
      products : products,
    })

      await order.save();
    req.user.clearCart();
    console.log("product save seccess")
  res.status(200).json({message : "productremove success"})
  } catch (error) {
    res.status(500).json({err : "internal sever erro"})
    
  }
};


exports.getOrderslist = async (req, res, next) => {
  try{
    let orders = await Order.find({'user.userId' : req.user._id})
    console.log( "products",orders)
     res.status(201).json(orders)
    }catch(err){
      res.status(500).json({err : "internal sever erro"})
    }  
  
}





















