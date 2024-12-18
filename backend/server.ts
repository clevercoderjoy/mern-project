import express, { Request, Response } from "express";
import { connectDB } from "./config/db";
import dotenv from "dotenv";
import productRoutes from "./routes/product.route";

dotenv.config({ path: "./backend/.env" });
const app = express();
app.use(express.json());

// root
app.get("/", (req: Request, res: Response) => {
  res.send("Server is ready");
});

app.use("/api/products", productRoutes);

// server
app.listen(5000, () => {
  connectDB();
  console.log("server started at http://localhost:5000");
});
