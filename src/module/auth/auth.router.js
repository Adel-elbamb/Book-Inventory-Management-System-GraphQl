import { Router } from "express";
import { asyncHandler } from "../../utilis/asyncHandler.js";
import validation from "../../DB/middleware/validation.js";
import * as authController from "./controller/auth.controller.js";
import * as authValidation from "./auth.validation.js";
import uploadFileCloud, {
  uploadedFileValidation, 
} from "../../utilis/cloudinaryMulter.js";
import { createHandler } from "graphql-http/lib/use/express";
import Schema from "./graphQl/auth.schema.js";
const router = Router();
router
  .post(
    "/signUp",
    uploadFileCloud(uploadedFileValidation.image).single("image"),
    validation(authValidation.signUpSchema),
    asyncHandler(authController.signUp)
  )
  .get(
    "/confirmEmail/:token",
    validation(authValidation.confirmEmailSchema),
    authController.confirmEmail
  )
  .get(
    "/refreshToken/:token",
    validation(authValidation.refreshTokenSchema),
    authController.refreshToken
  )
  .post(
    "/graphQl/user",
    createHandler({ schema: Schema })
  );

export default router;
