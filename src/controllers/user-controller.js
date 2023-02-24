import User from "../models/user.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { email, password } = req.body;
  const { file } = req;

  if (!email || !password) {
    return res.status(400).json({ error: "Enter all required fields" });
  }

  const exist = await User.findOne({ email });
  if (exist) {
    return res
      .status(409)
      .json({ error: "An account with this email already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    email,
    password: hashedPassword,
    avatar: "images/" + file.originalname,
  });

  const saveUser = await newUser.save();

  res.status(201).send({ user: saveUser });
};
