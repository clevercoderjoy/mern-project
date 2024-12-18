import express from "express";
import {
  addNewProduct,
  deleteExistingProduct,
  getAllProducts,
  updateExistingProduct,
} from "../controllers/product.controller";

const router = express.Router();

// get all products
router.get("/", getAllProducts);

// add new product
router.post("/addProduct", addNewProduct);

// update existing product
router.put("/:id", updateExistingProduct);

// delete existing product
router.delete("/:id", deleteExistingProduct);
export default router;
