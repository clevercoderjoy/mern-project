import express, { Request, Response } from "express";
import { connectDB } from "./config/db";
import dotenv from "dotenv";
import productRoutes from "./routes/product.route";
import { cors } from "cors";

dotenv.config({ path: "./.env" });
const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

// root
app.get("/", (req: Request, res: Response) => {
  res.send("Server is ready");
});

app.use("/api/products", productRoutes);

// server
app.listen(5000, () => {
  connectDB();
  console.log("server started at https://mern-project-asso.onrender.com");
});
