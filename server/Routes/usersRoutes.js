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
   * @desc login
   * @route /api/users/login
   * @method POST
   * @access public
   */  
  router.post("/login",asyncHandler(async(req,res)=>{
const user = await User.findOne({ email: req.body.email });
if (!user) return res.status(404).json("User not found");

const validPassword = await bcrypt.compare(
  req.body.password,
  user.password
);
if (!validPassword) return res.status(401).json("Wrong password");
// create token
const token = jwt.sign(
  { id: user._id, isadmin: user.isadmin },
  process.env.JWT_SECRET_KEY,
  { expiresIn: "5m" }
);
const { password, ...other } = user._doc;
res.status(200).json({ ...other, token });
  }))
  
/** 
   * @desc register
   * @route /api/users/register
   * @method POST
   * @access public
   */  

  router.post("/register", asyncHandler(async (req, res) => {
  console.log(req.body); // debug

  const { name, email, password, subscriptionId } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    subscriptionId
  });

  await newUser.save();
  res.status(201).json({ message: "User created" });
}));

  /** 
   * @desc get profile
   * @route /api/users/:token
   * @method GET
   * @access private
   */  
  router.get("/:id", verifyTokenAndAuthorization, (req, res) => {
 res.json("Protected user data");
});


  

export default router; 