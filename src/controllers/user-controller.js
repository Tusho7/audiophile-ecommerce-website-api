import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const { email, password } = req.body;
  const { file } = req;

  if (!email || !password) {
    return res.status(400).json({ error: "Enter all required fields" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
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

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Enter all required fields" });
  }

  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    return res.status(401).json({ error: "Wrong email or password" });
  }

  const isValidPassword = await bcrypt.compare(password, existingUser.password);
  if (!isValidPassword) {
    return res.status(401).json({ error: "Wrong email or password" });
  } else {
    const token = jwt.sign(
      {
        id: existingUser._id,
        email: existingUser.email,
        avatar: existingUser.avatar,
      },
      process.env.JWT_SECRET_KEY
    );

    return res.status(201).json({
      message: "Login Succesfully",
      token,
    });
  }
};

export const authenticate = (req, res, next) => {
  const auth = req.header("Authorization");

  if (!auth) {
    return res.status(401).send("Access denied. No token provided");
  }

  const [, token] = auth.trim().split(" ");
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  return res.status(200).json(decoded);
};
