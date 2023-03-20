import CartItem from "../models/cartItem.js";

export const postCart = async (req, res) => {
  const cartitem = await CartItem.findOne({
    userId: req.body.userId,
    name: req.body.name,
  });
  if (!cartitem) {
    const newCart = new CartItem({
      name: req.body.name,
      price: req.body.price,
      number: req.body.number,
      image: req.body.image,
      userId: req.body.userId,
    });
    const saveCart = await newCart.save();
    return res.status(201).json("Cart Added");
  } else {
    await cartitem.update({ number: cartitem.number + req.body.number });
    return res.status(200).json("Cart Updated");
  }
};

export const getCart = async (req, res) => {
  const allCarts = await CartItem.find();
  res.status(200).json(allCarts);
};

export const deleteCarts = async (req, res) => {
  try {
    const userId = String(req.params.id);
    console.log("userId:", userId); // Log the userId value
    const result = await CartItem.deleteMany({ userId });
    console.log("result:", result); // Log the result of the deleteMany operation
    res.status(200).json({ message: "Cart items successfully deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to delete cart items" });
  }
};
