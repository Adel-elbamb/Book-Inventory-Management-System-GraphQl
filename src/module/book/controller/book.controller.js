import slugify from "slugify";
import bookModel from "../../../DB/models/Book.model.js";
import cloudinary from "../../../utilis/cloudinary.js";

export const addBook = async (req, res, next) => {
  if (!req.body.title) {
    return next(new Error("title is require", { cause: 400 }));
  }
  const bookExist = await bookModel.findOne({ title: req.body.title });
  if (bookExist) {
    return next(new Error("title already exist", { cause: 404 })); 
  }
  if (!req.file) {
    return next(new Error("image is require", { cause: 400 }));
  }
  const { public_id, secure_url } = await cloudinary.uploader.upload(
    req.file.path,
    { folder: `${process.env.APP_NAME}/book` }
  );
  req.body.image = { public_id, secure_url };
  req.body.slug = slugify(req.body.title);
  req.body.createdBy = req.user._id;
  const newBook = await bookModel.create(req.body);
  if (newBook) {
    return res.status(201).json({
      message: "book created successfully",
      book: newBook,
    });
  }
};


