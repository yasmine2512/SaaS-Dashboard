import express from "express";
import Order from "../Models/Order.js";
// import Product from "../Models/Product";
import asyncHandler from "express-async-handler";
import { verifyTokenAndAuthorization } from "../Middlewares/JWTauth.js";
const router = express.Router();
export default router; 

/** 
   * @desc show all orders 
   * @route /api/orders/:id
   * @method GET
   * @access private
   */  
router.get("/:id",verifyTokenAndAuthorization,asyncHandler(async(req,res)=>{
   const userId = req.params.id;
const userOrders = await constOrder.find({_id : userId});
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
   const order = new Order({
       product: products,
       totalPrice: totalprice,
   })
   await order.save();
   return res.status(201).json({massage:"order created"});

}))
 



/** 
   * @desc check the order
   * @route /api/auth/register
   * @method POST
   * @access private
   */  






/** 
   * @desc deliver order
   * @route /api/auth/register
   * @method POST
   * @access private
   */  