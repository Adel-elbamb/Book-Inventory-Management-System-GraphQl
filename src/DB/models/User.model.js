import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: [true, "userName is required"],
      min: [2, "min length 2 char"],
      max: [20, "max length 20 char"],
    },
    slug: {
      type: String,
      required: [true, "slug is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: [true, "email already exit"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    phone: {
      type: String,
    },
    role: {
      type: String,
      enum: ["User", "Admin"],
      default: "User",
    },
    department: {
      type: String,
      required: [true, "department is required"],
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      default: "male",
    },
    confirmEmail: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["online", "offline"],
      default: "offline",
    },
    image: Object,
    semester: String,
  },
  {
    timestamps: true,
  }
);
// mongoose
const userModel = model("User", userSchema);
export default userModel;
