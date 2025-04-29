import express from "express";
import { BookController } from "./book.controller";
import expressValidationRequest from "../../middlewares/expressValidationRequest";
import { BookValidation } from "./book.validation";
const router = express.Router();

router.get('/:id', BookController.getSingleBook);
router.patch(
  '/:id',
  expressValidationRequest(BookValidation.updateBookValidationSchema),
  BookController.updateBook
);
router.delete('/:id', BookController.deleteBook);
router.get('/', BookController.getAllBooks);

router.post('/', expressValidationRequest(BookValidation.createBookValidationSchema), BookController.createBook);

export const BookRoutes = router;