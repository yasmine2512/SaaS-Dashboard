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
   * @desc revenu,norders,nproducts,ncustomers,revenu in last 7 months(month),n ordersin week (day),3 best sellers products,stock alert,monthly recurring revenue (MRR),Show new signups
   * @route  /api/dashboard/:id
   * @method GET
   * @access private
   */  

router.get("/:id",verifyTokenAndAdmin,asyncHandler(async(req,res)=>{


 //Show new signups
   const last7Days = new Date();
last7Days.setDate(last7Days.getDate() - 7);
const newsignups = await User.countDocuments({
  createdAt: { $gte: last7Days }});

  }))

  /** 
   * @desc active subscriptions,monthly recuring,churn rate,avrg revenu user,top subscribers,plan distrbution
   * @route  /api/dashboard/:id
   * @method GET
   * @access private
   */ 