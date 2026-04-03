import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from'./Routes/authRoutes.js';
import dashboardRoutes from './Routes/dashboardRoutes.js';
import ordersRoutes from './Routes/ordersRoutes.js';
import productsRoutes from './Routes/productsRoutes.js';
import subscriptionRoutes from './Routes/subscriptionRoutes.js';
import usersRoutes from './Routes/usersRoutes.js';
import connectDB from "./config/db.js"; 
dotenv.config();


const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/auth",authRoutes);
app.use("/api/users",usersRoutes);
app.use("/api/products",productsRoutes);
app.use("/api/orders",ordersRoutes);
app.use("/api/subscription",subscriptionRoutes);
app.use("/api/dashboard",dashboardRoutes);
// app.connectdb();
app.use("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});