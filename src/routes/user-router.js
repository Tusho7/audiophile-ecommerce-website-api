import express from "express";
import {
  authenticate,
  loginUser,
  signup,
} from "../controllers/user-controller.js";
import multer from "multer";

const userRouter = express.Router();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/avatar");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jgp" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

userRouter.post(
  "/auth/signup",
  multer({ storage: fileStorage, fileFilter }).single("avatar"),
  signup
);

userRouter.post("/user/login", loginUser);

userRouter.get("/user", authenticate, async (req, res) => {
  console.log(req.user._id);
  const foundUser = await User.findById(req.user._id).select("-password");
  console.log(foundUser);
  res.send(foundUser);
});

export default userRouter;
