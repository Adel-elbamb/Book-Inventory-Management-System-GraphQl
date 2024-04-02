import userModel from "../../../DB/models/User.model.js";
import {
  generateToken,
  verifyToken,
} from "../../../utilis/GenerateAndVerifyToken.js";
import { compareHashed, hashPassword } from "../../../utilis/HashAndCompare.js";
import sendEmail from "../../../utilis/email.js";
import cloudinary from "../../../utilis/cloudinary.js";
import slugify from "slugify";
//========================================signUp==============================
export const signUp = async (req, res, next) => {
  const userExist = await userModel.findOne({ email: req.body.email });
  if (userExist) {
    return next(new Error("email already exist", { cause: 409 }));
  }
  const token = generateToken({
    payload: { email: req.body.email },
    signature: process.env.EMAIL_SIGNUTURE,
    expireIn: 60 * 30,
  });
  const rf_token = generateToken({
    payload: { email: req.body.email },
    signature: process.env.EMAIL_SIGNUTURE,
    expireIn: 60 * 60 * 24,
  });
  const link = `${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}`;
  const rf_link = `${req.protocol}://${req.headers.host}/auth/refreshToken/${rf_token}`;
  const html = `
  <a href=${link} style="color:red;">confirm email</a>
  <br>
  <br>
  <a href=${rf_link} style="color:red;">send new email</a>
  `;
  const emailSended = sendEmail({
    to: req.body.email,
    html,
    subject: "confirm Email",
  });
  if (!emailSended) {
    return next(new Error("falied to send email", { cause: 404 }));
  }
  if (req.file) {
    const { public_id, secure_url } = await cloudinary.uploader.upload(
      req.file.path,
      {
        folder: `${process.env.APP_NAME}/user`,
      }
    );
    req.body.image = { public_id, secure_url };
  }
  req.body.slug = slugify(req.body.userName);
  req.body.password = hashPassword({ plaintext: req.body.password });
  const newUser = await userModel.create(req.body);
  return res.status(201).json({
    message: "user created successfully",
    id: newUser._id,
  });
};
export const confirmEmail = async (req, res, next) => {
  const { email } = verifyToken({
    token: req.params.token,
    signature: process.env.EMAIL_SIGNUTURE,
  });
  const userExist = await userModel.findOne({ email: email });
  if (!userExist) {
    return res.redirect("https://www.linkedin.com/in/adel-elbamby-a0102a22b/");
  }
  // if (userExist.confirmEmail) {
  //   return res.redirect("https://www.linkedin.com/in/adel-elbamby-a0102a22b/");
  // }
  await userModel.updateOne({ email }, { confirmEmail: true });
  return res.redirect("https://www.linkedin.com/in/adel-elbamby-a0102a22b/");
};
export const refreshToken = async (req, res, next) => {
  const { email } = verifyToken({
    token: req.params.token,
    signature: process.env.EMAIL_SIGNUTURE,
  });
  const userExist = await userModel.findOne({ email: email });
  if (!userExist) {
    return res.redirect("https://www.linkedin.com/in/adel-elbamby-a0102a22b/");
  }
  if (userExist.confirmEmail) {
    return res.redirect("https://www.linkedin.com/in/adel-elbamby-a0102a22b/");
  }
  const newToken = generateToken({
    payload: { email },
    signature: process.env.EMAIL_SIGNUTURE,
    expireIn: 60 * 10,
  });
  const link = `${req.protocol}://${req.headers.host}/auth/confirmEmail/${newToken}`;
  const html = `
  <a href=${link} style="color:red;">confirm email</a>  `;
  const emailSended = sendEmail({
    to: email,
    html,
    subject: "confirm Email",
  });
  if (!emailSended) {
    return next(new Error("falied to send email", { cause: 404 }));
  }
  return res.send("<h2>check your email</h2>");
};

////==============================login =================================
export const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return next(new Error("invalid email or password", { cause: 400 }));
  }
  if (!user.confirmEmail) {
    return next(new Error("please confirm your email", { cause: 400 }));
  }
  const match = compareHashed({
    plaintext: password,
    hashedValue: user.password,
  });
  if (!match) {
    return next(new Error("invalid email or password", { cause: 400 }));
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

  return res.status(200).json({
    message: "Done",
    token,
    refToken,
  });
};

