import express from "express";
const router = express.Router();
export default router; 
import asyncHandler from "express-async-handler";
import User from "../Models/User.js"
import Product from "../Models/Product.js"
import {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin
} from '../JWTauth.js'


/** 
   * @desc Show new signups
   * @route /api/dashboard/users
   * @method GET
   * @access private
   */  
  router.get("/users",asyncHandler(async(req,res)=>{
 
   const last7Days = new Date();
last7Days.setDate(last7Days.getDate() - 7);
const newsignups = await User.countDocuments({
  createdAt: { $gte: last7Days }});
   return res.json({newSignups: newsignups})
  }))






/** 
   * @desc revenu,norders,nproducts,ncustomers,revenu in last 7 months(month),n ordersin week (day),3 best sellers,stock alert,monthly recurring revenue (MRR)
   * @route  /api/dashboard/orders
   * @method GET
   * @access private
   */  
