import express from "express";
import { connectDB } from "./config/db";
import dotenv from "dotenv";

dotenv.config({ path: "./backend/.env" });
const app = express();

app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.listen(5000, () => {
  connectDB();
  console.log("server started at http://localhost:5000");
});
