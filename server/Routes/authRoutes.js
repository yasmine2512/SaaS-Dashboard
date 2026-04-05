import express from "express";
const router = express.Router();
import User from '../Models/User.js'
import Product from "../Models/Product.js"
import asyncHandler from "express-async-handler";
import {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin
} from '../JWTauth.js'

/** 
   * @desc login
   * @route /api/auth/login
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
   * @route /api/auth/register
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
   * @desc get users list
   * @route /api/auth/:id/all-users
   * @method GET
   * @access private
   */  
router.get("/:id/all-users",verifyTokenAndAdmin,asyncHandler(async(req,res)=>{
const all_users = await User.find(); //pagination
const count = await User.countDocuments()
res.json({users : all_users });
}))

/** 
   * @desc delete user
   * @route /api/auth/:id/all-users/:userId
   * @method DELETE
   * @access private
   */  
router.delete("/:id/all-users/:userId",verifyTokenAndAdmin,asyncHandler(async(req,res)=>{
    const userId = req.params.userId;
    await User.deleteOne({_id : userId});
    return res.status(200).json({message : "user deleted succesfully"});

}))



export default router; 

