import express, { Request, Response } from "express";
import { connectDB } from "./config/db";
import dotenv from "dotenv";
import productRoutes from "./routes/product.route";
import cors from "cors";

dotenv.config({ path: "./.env" });
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// root
app.get("/", (req: Request, res: Response) => {
  res.send("Server is ready");
});

app.get("/.well-known/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "OK" });
});

app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5000;

// server
app.listen(PORT, () => {
  connectDB();
  console.log("server started at https://mern-project-asso.onrender.com");
});
