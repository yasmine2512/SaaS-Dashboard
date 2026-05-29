import express from "express";
import Order from "../Models/Order.js";
import User from "../Models/User.js";
// import Product from "../Models/Product";
import asyncHandler from "express-async-handler";
import { verifyTokenAndAdmin, verifyTokenAndAuthorization } from "../Middlewares/JWTauth.js";
const router = express.Router();
export default router; 

/** 
   * @desc show all orders ,total orders,pending orders,completed orders,canceled orders per day 7,orders by status,Average Order Value (AOV)
   * @route /api/orders/:organisationid
   * @method GET
   * @access private
   */  
router.get("/user/:id",verifyTokenAndAuthorization,asyncHandler(async(req,res)=>{
   const userId = req.params.id;
const userOrders = await Order.find({user : userId});
return res.json(userOrders);

}))



/** 
   * @desc create an order
   * @route /api/orders/:id
   * @method POST
   * @access private
   */  
router.post("/:id", verifyTokenAndAuthorization, asyncHandler(async (req, res) => {
  const { products, totalprice } = req.body;
  const decremented = [];

  for (const item of products) {
    const updated = await Product.findOneAndUpdate(
      { _id: item.product, stock: { $gte: item.quantity } },
      { $inc: { stock: -item.quantity } },
      { new: true }
    );

    if (!updated) {
      for (const done of decremented) {
        await Product.findByIdAndUpdate(done.product, {
          $inc: { stock: done.quantity },
        });
      }
      return res.status(400).json({ message: `Not enough stock for product ${item.product}` });
    }

    decremented.push(item);
  }

  const order = new Order({
    user: req.params.id,
    products,
    totalPrice: totalprice,
  });

  await order.save();
  return res.status(201).json({ message: "Order created", order });
}));

 
/** 
   * @desc check the order
   * @route /api/orders/completed/:id
   * @method PUT
   * @access private
   */  
router.put("/completed/:id",verifyTokenAndAdmin,asyncHandler(async(req,res)=>{
   const orderId = req.params.id;
   const order = await Order.findByIdAndUpdate(orderId,{
      $set:{status: "completed",}
   },{new : true});
   await order.save();
   if (!order) return res.status(404).json({ message: "Order not found" });
   return res.json({ message: "updated to completed", order });
}))
 
/** 
   * @desc deliver order
   * @route /api/orders/delivered/:id
   * @method POST
   * @access private
   */  
  router.put("/delivered/:id",verifyTokenAndAdmin,asyncHandler(async(req,res)=>{
   const orderId = req.params.id;
   const order = await Order.findByIdAndUpdate(orderId,{
      $set:{status: "delivered",}
   },{new : true});
   await order.save();
   if (!order) return res.status(404).json({ message: "Order not found" });
   return res.json({ message: "updated to completed", order });
}))