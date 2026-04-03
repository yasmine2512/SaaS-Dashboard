import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  image: String, // cloudinary URL
  createdAt: { type: Date, default: Date.now },
});
const Product = mongoose.model("Product", productSchema);
export default Product;