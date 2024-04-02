import { Router } from "express";
import { asyncHandler } from "../../utilis/asyncHandler.js";
import auth from "../../DB/middleware/auth.js";
import tokenSchema from "../../utilis/tokenValidation.js";
import brandRolesEndPoints from "./book.roles.endPoints.js";
import uploadFileCloud, {
  uploadedFileValidation,
} from "../../utilis/cloudinaryMulter.js";
import validation from "../../DB/middleware/validation.js";
import { addBrandSchema } from "./book.validation.js";
import * as brandController from "./controller/book.controller.js";
import bookSchema from "./graphQl/book.schema.js";
import { createHandler } from "graphql-http/lib/use/express";
const router = Router();
///================================================
router
  .post(
    "/",
    validation(tokenSchema, true),
    auth(brandRolesEndPoints.create),
    uploadFileCloud(uploadedFileValidation.image).single("image"),
    validation(addBrandSchema),
    asyncHandler(brandController.addBook)
  )
  .post("/graphQl", createHandler({ schema: bookSchema }));

export default router;
