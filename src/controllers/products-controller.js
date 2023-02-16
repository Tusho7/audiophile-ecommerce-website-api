import Product from "../models/products.js";

export const getAllProducts = async (req, res) => {
  const data = await Product.find();
  return res.json(data);
};
