import joi from "joi";
import generalFields from "../../utilis/generalFields.js";

export const addBrandSchema = joi.object({
  title: joi.string().trim().required().messages({
    "string.empty": "title can't be empty",
    "any.required": "title is required field",
  }),
  author: joi.string().min(3).max(30).required(),
  publicationDate: joi.string().required(),
  publisher: joi.string().min(3).max(30),
  genre: joi.string(),
  file: generalFields.file.required(),
});
export const getOneBookSchema = joi.object({
  title: joi.string().trim(),
});
export const borrowBookSchema = joi.object({
  title: joi.string().trim().required().messages({
    "string.empty": "title can't be empty",
    "any.required": "title is required field",
  }),
  authorization: generalFields.authorization,
  bookingDate: joi.string().required(),
  returnDate: joi.string().required(),
});
export const deleteBookSchema = joi.object({
  title: joi.string().trim().required().messages({
    "string.empty": "title can't be empty",
    "any.required": "title is required field",
  }),
  authorization: generalFields.authorization,
});
