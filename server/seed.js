import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// Import your models
import User from "./Models/User.js";
import Product from "./Models/Product.js";
import Order from "./Models/Order.js";
import Subscription from "./Models/Subscription.js";

dotenv.config();

// Connect to MongoDB
connectDB();

const seedData = async () => {
  try {
    // 1. Delete existing data
    await Order.deleteMany();
    await Product.deleteMany();
    await Subscription.deleteMany();
    await User.deleteMany();

    console.log("Old data cleared.");

    // 2. Create sample users
    const users = await User.insertMany([
      { name: "Alice", email: "alice@example.com", password: "1234", role: "user" },
      { name: "Bob", email: "bob@example.com", password: "1234", role: "user" },
      { name: "Admin", email: "admin@example.com", password: "admin123", role: "admin" },
    ]);

    console.log("Users seeded.");

    // 3. Create sample products
    const products = await Product.insertMany([
      { name: "Pro Plan", description: "Pro subscription plan", price: 29.99, stock: 50 },
      { name: "Enterprise Plan", description: "Enterprise subscription plan", price: 99.99, stock: 20 },
      { name: "Basic Plan", description: "Basic subscription plan", price: 9.99, stock: 100 },
    ]);

    console.log("Products seeded.");

    // 4. Create sample subscriptions
    const subscriptions = await Subscription.insertMany([
      { user: users[0]._id, stripeSubscriptionId: "sub_001", status: "active", plan: "Pro Plan" },
      { user: users[1]._id, stripeSubscriptionId: "sub_002", status: "active", plan: "Enterprise Plan" },
    ]);

    console.log("Subscriptions seeded.");

    // 5. Create sample orders
    const orders = await Order.insertMany([
      {
        user: users[0]._id,
        products: [
          { product: products[0]._id, quantity: 1 },
          { product: products[2]._id, quantity: 2 },
        ],
        totalPrice: 29.99 + 2 * 9.99,
        status: "pending",
      },
      {
        user: users[1]._id,
        products: [{ product: products[1]._id, quantity: 1 }],
        totalPrice: 99.99,
        status: "completed",
      },
    ]);

    console.log("Orders seeded.");

    console.log("Database seeded successfully!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

// Run the seeding
seedData();