import express from "express";

const router = express.Router();

import Order from "../Models/Order.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin
} from '../Middlewares/JWTauth.js'

/** 
   * @desc total customers, new customers this month, average order value, customers retention rate,growth chart,Customer Spending Distribution , top customers,Customer Lifetime Value (CLV)
   * @route /api/customers/:organizationid
   * @method GET
   * @access private
   */  
router.get("/:companyid",verifyTokenAndAuthorization,asyncHandler(async(req,res)=>{


}))







  

export default router; 