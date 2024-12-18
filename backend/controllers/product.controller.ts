import Product, { IProduct } from "../models/product.model";
import { Request, Response } from "express";

export const getAllProducts = async (req: Request, res: Response) => {
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
};

export const addNewProduct = async (req: Request, res: Response) => {
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
};

export const updateExistingProduct = async (req: Request, res: Response) => {
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
};

export const deleteExistingProduct = async (req: Request, res: Response) => {
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
};
