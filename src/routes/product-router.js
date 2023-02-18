import express from "express";
import { getAllProducts } from "../controllers/products-controller.js";

const productRouter = express.Router();

productRouter.get("/products", getAllProducts);

export default productRouter;
