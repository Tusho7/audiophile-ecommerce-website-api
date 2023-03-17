import express from "express";
import { postCart, getCart, deleteCarts } from "../controllers/cart.js";

const cartRouter = express.Router();

cartRouter.post("/cart", postCart);
cartRouter.get("/carts", getCart);
cartRouter.delete("/deleteCarts", deleteCarts);

export default cartRouter;
