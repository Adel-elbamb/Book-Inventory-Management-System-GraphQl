import { verifyToken } from "../../utilis/GenerateAndVerifyToken.js";
import userModel from "../models/User.model.js";

const auth = (role) => {
  return async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
      return next(new Error("please login first", { cause: 400 }));
    }
    if (!authorization?.startsWith(process.env.TOKEN_BEARER_KEY)) {
      return next(new Error("invalid bearer key", { cause: 400 }));
    }
    const token = authorization.split(process.env.TOKEN_BEARER_KEY)[1];
    if (!token) {
      return next(new Error("invalid token", { cause: 400 }));
    }
    const deToken = verifyToken({
      token,
      signature: process.env.JWT_TOKEN_SIGNUTURE,
    });
    if (!deToken?.id) {
      return next(new Error("invalid token payload", { cause: 400 }));
    }
    const authUser = await userModel.findById({ _id: deToken?.id });
    if (!authUser) {
      return next(new Error("not register account", { cause: 400 }));
    }
    if (authUser.status == "offline") {
      return next(new Error("please login first", { cause: 400 }));
    }
    if (!role.includes(authUser?.role)) {
      return next(
        new Error("not authourized to do this action", { cause: 401 })
      );
    }
    req.user = authUser;
    return next();
  };
};
export default auth;

/// =============================================GraphQl Auth ===================================================
export const graphQlAuth = async (role, args) => {
  const { authorization } = args;
  if (!authorization) {
    throw Error("please login first");
  }
  if (!authorization?.startsWith(process.env.TOKEN_BEARER_KEY)) {
    throw Error("invalid bearer key");
  }
  const token = authorization.split(process.env.TOKEN_BEARER_KEY)[1];
  if (!token) {
    throw Error("invalid token");
  }
  const deToken = verifyToken({
    token,
    signature: process.env.JWT_TOKEN_SIGNUTURE,
  });
  if (!deToken?.id) {
    throw Error("invalid token payload");
  }
  const authUser = await userModel.findById({ _id: deToken?.id });
  if (!authUser) {
    throw Error("not register account");
  }
  if (authUser.status == "offline") {
    throw Error("please login first");
  }
  if (!role.includes(authUser?.role)) {
    throw Error("not authourized to do this action");
  }
  return authUser;
};
