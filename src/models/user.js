import mongoose, { mongo } from "mongoose";
mongoose.set("strictQuery", false);

const { Schema } = mongoose;

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", UserSchema);

export default User;
