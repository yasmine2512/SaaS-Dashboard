import express from "express";
import Product from "../Models/Product.js"
import asyncHandler from "express-async-handler";
import {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin
} from '../Middlewares/JWTauth.js'
import { upload } from "../Middlewares/Multer.js";
const router = express.Router();



/** 
   * @desc get all product
   * @route /api/products
   * @method GET
   * @access public
   */ 

router.get("/",asyncHandler(async(req,res)=>{
    const products =await Product.find();
    const count = await Product.countDocuments(); //for pagination
    return res.json({products});
}))



/** 
   * @desc insert new product
   * @route /api/products/:id/new-product
   * @method POST
   * @access private
   */ 
router.post("/:id/new-product",verifyTokenAndAdmin,upload.single("image"),asyncHandler(async(req,res)=>{
 
const {name,price,desc,category,stock} = req.body;
let features = []
    try {
      features = JSON.parse(req.body.features)
    } catch (err) {
      return res.status(400).json({ message: "Features must be JSON array" })
    }
const image = req.file.filename;
 if (!name || !desc || !price || !stock) {
    return res.status(400).json({ message: "Missing required fields" });
  }
const newproduct = new Product({
    name,
    price,
    category,
    description : desc,
    features,
    stock,
    image
})

await newproduct.save();
return res.status(201).json({message: "Product added succesfully"});

}))

/** 
   * @desc delete product
   * @route /api/auth/:id/products/:productid
   * @method DELETE
   * @access private
   */ 
  router.delete("/:id/products/:productid",verifyTokenAndAdmin,asyncHandler(async(req,res)=>{
    const productId = req.params.productid;
    await Product.deleteOne({_id : productId});
    return res.status(201).json({message: "Product deleted succesfully"});
  }))

  /** 
   * @desc update product
   * @route /api/auth/products/:productid
   * @method PUT
   * @access private
   */ 
  router.put("/:id/products/:productid",verifyTokenAndAdmin,asyncHandler(async(req,res)=>{
    const productId = req.params.productid;
    const {name,desc,price,stock,image} = req.body;
    const updateFields = {};
if (name) updateFields.name = name;
if (desc) updateFields.description = desc;
if (price !== undefined) updateFields.price = Number(price);
if (stock !== undefined) updateFields.stock = Number(stock);
if (image) updateFields.image = image;

    await Product.updateOne({_id : productId},{$set:updateFields})
    return res.status(201).json({message: "Product updated succesfully"});
  }))


export default router; 