import { graphQlAuth } from "../../../DB/middleware/auth.js";
import { graphQlValidation } from "../../../DB/middleware/validation.js";
import userModel from "../../../DB/models/User.model.js";
import { generateToken } from "../../../utilis/GenerateAndVerifyToken.js";
import { compareHashed } from "../../../utilis/HashAndCompare.js";
import roles from "../../../utilis/roles.js";
import * as authValidation from "../auth.validation.js";

export const loginResolver = async (parent, args) => {
  graphQlValidation(authValidation.loginSchema, args);
  const { email, password } = args;
  const user = await userModel.findOne({ email });
  if (!user) {
    throw Error("invalid email or password");
  }
  if (!user.confirmEmail) {
    throw Error("please confirm your email");
  }
  const match = compareHashed({
    plaintext: password,
    hashedValue: user.password,
  });
  if (!match) {
    throw Error("invalid email or password");
  }
  if (user.isDeleted) {
    user.isDeleted = false;
  }
  user.status = "online";
  await user.save();
  const token = generateToken({
    payload: { email: email, id: user._id, role: user.role },
    expireIn: 60 * 30,
  });
  const refToken = generateToken({
    payload: { email: email, id: user._id, role: user.role },
    expireIn: 60 * 60 * 24 * 30,
  });

  return {
    token,
    refToken,
  };
};
export const userProfileResolver = async (parent, args) => {
  graphQlValidation(authValidation.getUserSchema, args);
  const user = await graphQlAuth([roles.User, roles.Admin], args);
  return user;
};
export const updateUserResolver = async (parent, args) => {
  graphQlValidation(authValidation.updateUserSchema, args);
  const user = await graphQlAuth([roles.User, roles.Admin], args);
  const newUser = await userModel.findByIdAndUpdate({ _id: user._id }, args, {
    new: true,
  });
  return newUser;
};
