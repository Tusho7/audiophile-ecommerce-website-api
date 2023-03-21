import express from "express";
import { postCart, getCart, deleteCarts } from "../controllers/cart.js";

const cartRouter = express.Router();

cartRouter.post("/cart", postCart);
cartRouter.get("/carts/:userId", getCart);
cartRouter.delete("/deleteCarts/:userId", deleteCarts);

export default cartRouter;
