import express, { Request, Response } from "express";
import { connectDB } from "./config/db";
import dotenv from "dotenv";
import Product, { IProduct } from "./models/product.model";

dotenv.config({ path: "./backend/.env" });
const app = express();
app.use(express.json());

// root
app.get("/", (req: Request, res: Response) => {
  res.send("Server is ready");
});

// get all products
app.get("/api/products", async (req: Request, res: Response) => {
  try {
    const allProducts = await Product.find({});
    return res.status(200).json({
      success: true,
      message: "all products fetched successfully",
      data: allProducts,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: `server error ${error}` });
  }
});

// add new product
app.post("/api/product", async (req: Request, res: Response) => {
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
    res
      .status(500)
      .json({ success: false, message: `Error in creating product. ${error}` });
  }
});

// update existing product
app.put("/api/product/:id", async (req: Request, res: Response) => {
  const currentId = req.params.id;
  if (!currentId) {
    return res
      .status(400)
      .json({ success: false, message: "invalid valid id" });
  }
  const existingProduct = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      currentId,
      existingProduct,
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: `product updated successfully`,
      data: updatedProduct,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: `Error in updating product. ${error}` });
  }
});

// delete existing product
app.delete("/api/product/:id", async (req: Request, res: Response) => {
  const currentId = req.params.id;
  if (!currentId) {
    return res
      .status(400)
      .json({ success: false, message: "invalid valid ID" });
  }
  try {
    const currentProduct = await Product.findById(currentId);
    if (!currentProduct) {
      return res.status(404).json({
        success: false,
        message: `product with ID: ${currentId} does not exists`,
      });
    } else {
      await Product.findByIdAndDelete(currentId);
      return res.status(201).json({
        success: true,
        message: `product with ID: ${currentId} deleted successfully`,
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: `Error in creating product. ${error}` });
  }
});

// server
app.listen(5000, () => {
  connectDB();
  console.log("server started at http://localhost:5000");
});
