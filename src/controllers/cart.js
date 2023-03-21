import CartItem from "../models/cartItem.js";

export const postCart = async (req, res) => {
  const { userId, name, price, number, image } = req.body;
  const cartitem = await CartItem.findOne({ userId, name, image });
  if (!cartitem) {
    const newCart = new CartItem({
      name,
      price,
      number,
      image,
      userId,
    });
    const saveCart = await newCart.save();
    return res.status(201).json("Cart Added");
  } else {
    await cartitem.updateOne({ $inc: { number } });
    return res.status(200).json("Cart Updated");
  }
};

export const getCart = async (req, res) => {
  const userId = String(req.params.userId);
  console.log(userId);
  const allCarts = await CartItem.find({ userId });
  console.log(allCarts);
  res.status(200).json(allCarts);
};

export const deleteCarts = async (req, res) => {
  const userId = String(req.params.userId);
  const result = await CartItem.deleteMany({ userId });
  res.status(200).json({ message: "Cart items successfully deleted" });
};
