import express from "express";
import Product from "../Models/Product.js"
import asyncHandler from "express-async-handler";
import {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin
} from '../Middlewares/JWTauth.js'
import { getUpload, cloudinary } from "../Middlewares/Multer.js";
const router = express.Router();



/** 
   * @desc get all product
   * @route /api/products
   * @method GET
   * @access public
   */ 

router.get("/",verifyTokenAndAuthorization,asyncHandler(async(req,res)=>{
    const products =await Product.find();
    // const count = await Product.countDocuments(); //for pagination
    return res.json({products});
}))

/** 
   * @desc get product
   * @route /api/products/:productid
   * @method GET
   * @access public
   */ 
  router.get("/:productid", asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.productid);
  if (!product) return res.status(404).json({ message: "Product not found" });
  return res.json({ product });
}));

/** 
   * @desc insert new product
   * @route /api/products/:id/new-product
   * @method POST
   * @access private
   */ 
router.post("/:id/new-product", verifyTokenAndAdmin, (req, res, next) => {
  getUpload().single("image")(req, res, next); // ← initialized when request hits
}, asyncHandler(async (req, res) => {
 
const {name,price,desc,category,stock} = req.body;
let features = []
console.log("file:", req.file);       // check if multer received the file
    try {
      features = JSON.parse(req.body.features)
    } catch (err) {
      return res.status(400).json({ message: "Features must be JSON array" })
    }
if (!req.file) return res.status(400).json({ message: "Image is required" });
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
    image :req.file.path,
})

await newproduct.save();
return res.status(201).json({message: "Product added succesfully"});

}))

/** 
   * @desc delete product
   * @route /api/products/:id/product/:productid
   * @method DELETE
   * @access private
   */ 
  router.delete("/:id/product/:productid",verifyTokenAndAdmin,asyncHandler(async(req,res)=>{
    const product = await Product.findById(req.params.productid);
  if (!product) return res.status(404).json({ message: "Product not found" });

  // URL looks like: https://res.cloudinary.com/yourcloud/image/upload/v123/products/abc123.jpg
  const urlParts = product.image.split("/");
  const publicId = `products/${urlParts[urlParts.length - 1].split(".")[0]}`;
  await cloudinary.uploader.destroy(publicId);

  await Product.deleteOne({ _id: req.params.productid });
  return res.status(200).json({ message: "Product deleted successfully" });
  }))

  /** 
   * @desc update product
   * @route /api/products/:id/product/:productid
   * @method PUT
   * @access private
   */ 
  router.put("/:id/product/:productid", verifyTokenAndAdmin, (req, res, next) => {
  getUpload().single("image")(req, res, next);
}, asyncHandler(async (req, res) => {
  const productId = req.params.productid;

  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ message: "Product not found" });

  const { name, desc, price, stock, category, features } = req.body;
  const updateFields = {};

  if (name) updateFields.name = name;
  if (desc) updateFields.description = desc;
  if (category) updateFields.category = category;
  if (price !== undefined) updateFields.price = price;
  if (stock !== undefined) updateFields.stock = Number(stock);

  // parse features if sent
  if (features) {
    try {
      updateFields.features = JSON.parse(features);
    } catch {
      return res.status(400).json({ message: "Features must be a JSON array" });
    }
  }

  // if new image uploaded, delete old from cloudinary and use new URL
  if (req.file) {
    if (product.image) {
      const urlParts = product.image.split("/");
      const publicId = `products/${urlParts[urlParts.length - 1].split(".")[0]}`;
      await cloudinary.uploader.destroy(publicId);
    }
    updateFields.image = req.file.path;
  }

  if (Object.keys(updateFields).length === 0) {
    return res.status(400).json({ message: "No fields to update" });
  }

  const updated = await Product.findByIdAndUpdate(
    productId,
    { $set: updateFields },
    { new: true }
  );

  return res.status(200).json({ message: "Product updated successfully", product: updated });
}));



export default router; 