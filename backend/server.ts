import express, { Request, Response } from "express";
import { connectDB } from "./config/db";
import dotenv from "dotenv";
import Product, { IProduct } from "./models/product.model";

dotenv.config({ path: "./backend/.env" });
const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Server is ready");
});

app.post("/api/products", async (req: Request, res: Response) => {
  const product: IProduct = req.body;

  if (!product.name || !product.image || !product.price) {
    return res
      .status(400)
      .json({ success: false, message: "provide all the required values" });
  }

  const newProduct = new Product(product);
  try {
    await newProduct.save();
    return res
      .status(201)
      .json({ success: true, message: "product added successfully" });
  } catch (error: any) {
    console.log("Error in creating product:", error);
    res.status(500).json({ success: false, message: error });
  }
});

app.listen(5000, () => {
  connectDB();
  console.log("server started at http://localhost:5000");
});
