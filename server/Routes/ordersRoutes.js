import express from "express";
import Order from "../Models/Order.js";
import User from "../Models/User.js";
// import Product from "../Models/Product";
import asyncHandler from "express-async-handler";
import { verifyTokenAndAdmin, verifyTokenAndAuthorization } from "../Middlewares/JWTauth.js";
const router = express.Router();
export default router; 

/** 
   * @desc show all orders 
   * @route /api/orders/user/:id
   * @method GET
   * @access private
   */  
router.get("/user/:id",verifyTokenAndAuthorization,asyncHandler(async(req,res)=>{
   const userId = req.params.id;
const userOrders = await Order.find({_id : userId});
return res.json(userOrders);

}))

/** 
   * @desc create an order
   * @route /api/orders/:id
   * @method POST
   * @access private
   */  
router.post("/:id",verifyTokenAndAuthorization,asyncHandler(async(req,res)=>{
   const userId = req.params.id;
   const {products,totalprice} = req.body;
   const user = await User.findById(userId);
   const order = new Order({
       user,
       products: products,
       totalPrice: totalprice,
   })
   await order.save();
   return res.status(201).json({message:"order created"});

}))
 
/** 
   * @desc check the order
   * @route /api/orders/completed/:id
   * @method PUT
   * @access private
   */  
router.put("/completed/:id",verifyTokenAndAdmin,asyncHandler(async(req,res)=>{
   const orderId = req.params.id;
   const order = await Order.findByIdAndUpdate(orderId,{
      $set:{status: "completed",}
   },{new : true});
   await order.save().then(result =>{
      res.json({message : "updated to completed"}).catch(err =>{
         console.log(err);
      })
   })
}))
 
/** 
   * @desc deliver order
   * @route /api/orders/delivered/:id
   * @method POST
   * @access private
   */  
  router.put("/delivered/:id",verifyTokenAndAdmin,asyncHandler(async(req,res)=>{
   const orderId = req.params.id;
   const order = await Order.findByIdAndUpdate(orderId,{
      $set:{status: "delivred",}
   },{new : true});
   await order.save().then(result =>{
      res.json({message : "updated to delivered"});
   }).catch(err =>{
         console.log(err);
      })
}))