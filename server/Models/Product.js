import mongoose from "mongoose";
import { features } from "process";
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: String, required: true },
  stock: { type: Number, default: 0 },
  category: {type : String},
  features:{type: Array},
  image: String, 
  createdAt: { type: Date, default: Date.now },
});
const Product = mongoose.model("Product", productSchema);
export default Product;