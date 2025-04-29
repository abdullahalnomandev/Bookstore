import express from "express";
import { AuthorController } from "./author.controller";
import expressValidationRequest from "../../middlewares/expressValidationRequest";
import { AuthorValidation } from "./author.validation";
const router = express.Router();



router.get('/:id', AuthorController.getSingleAuthor);
router.patch(
  '/:id',
  expressValidationRequest(AuthorValidation.updateAuthorValidationSchema),
  AuthorController.updateAuthor
);
router.delete('/:id', AuthorController.deleteAuthor);
router.get('/', AuthorController.getAllAuthors);
router.post('/', expressValidationRequest(AuthorValidation.createAuthorValidationSchema), AuthorController.createAuthor);

export const AuthorRoutes = router;