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
    const updatedCart = await CartItem.find({ userId });
    return res.status(201).json({ message: "Cart Added", cart: updatedCart });
  } else {
    await cartitem.updateOne({ $inc: { number } });
    const updatedCart = await CartItem.find({ userId });
    return res.status(200).json({ message: "Cart Updated", cart: updatedCart });
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
