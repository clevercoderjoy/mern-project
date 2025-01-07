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

app.get("/.well-known/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "OK",
    service: "MERN API",
    time: new Date().toISOString(),
  });
});

// root
app.get("/", (req: Request, res: Response) => {
  res.send("Server is ready");
});

app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5000;

// server
app.listen(PORT, () => {
  connectDB();
  console.log(`Server environment: ${process.env.NODE_ENV}`);
  console.log(`CORS enabled for origin: ${process.env.FRONTEND_URL || "*"}`);
  console.log("server started at https://mern-project-asso.onrender.com");
});
