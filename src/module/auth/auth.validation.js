import joi from "joi";
import generalFields from "../../utilis/generalFields.js";

export const signUpSchema = joi
  .object({
    userName: joi.string().min(2).max(20).required() ,
    email: generalFields.email,
    password: generalFields.password,
    cPassword: joi.string().valid(joi.ref("password")).required(),
    phone: joi.string(),
    role: joi.string().valid("User", "Admin"),
    gender: joi.string().valid("male", "female"),
    age: joi.number(),
    file: joi.object(),
    semester: joi.string(),
    department: joi.string(),
  })
  .required();

export const confirmEmailSchema = joi
  .object({
    token: joi.string().required(),
  })
  .required();
export const refreshTokenSchema = joi
  .object({
    token: joi.string().required(),
  })
  .required();
export const loginSchema = joi
  .object({
    email: generalFields.email,
    password: generalFields.password,
  })
  .required();
export const tokenSchema = joi
  .object({
    token: joi.string().required(),
  })
  .required();
export const getUserSchema = joi
  .object({
    authorization: joi.string().required(),
  })
  .required();
export const updateUserSchema = joi
  .object({
    authorization: joi.string().required(),
    userName: joi.string().min(2).max(20),
    semester: joi.string(),
    department: joi.string(),
    phone: joi.string(),
  })
  .required();
