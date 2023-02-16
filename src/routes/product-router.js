import express from "express";
import { getAllProducts } from "../controllers/Products-controller.js";

const productRouter = express.Router();

productRouter.get("/products", getAllProducts);

export default productRouter;
