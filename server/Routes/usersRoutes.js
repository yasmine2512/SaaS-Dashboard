import express from "express";

const router = express.Router();

import User from '../Models/User.js'
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin
} from '../JWTauth.js'





  /** 
   * @desc get profile
   * @route /api/users/:id
   * @method GET
   * @access private
   */  
  router.get("/:id", verifyTokenAndAuthorization, (req, res) => {
 res.json("Protected user data");
});


  

export default router; 