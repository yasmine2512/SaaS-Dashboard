import express from "express";
import Product from "../Models/Product.js"
import asyncHandler from "express-async-handler";
import {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin
} from '../JWTauth.js'
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
   * @route /api/auth/:id/new-product
   * @method POST
   * @access private
   */ 
router.post("/:id/new-product",verifyTokenAndAdmin,asyncHandler(async(req,res)=>{
const {name,desc,price,stock,image} = req.body;
 if (!name || !desc || !price || !stock) {
    return res.status(400).json({ message: "Missing required fields" });
  }
const newproduct = new Product({
    name,
    description : desc,
    price,
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