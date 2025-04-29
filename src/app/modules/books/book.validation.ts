import { checkSchema } from 'express-validator';

export const createBookValidationSchema = checkSchema({
  'book.title': {
    in: ['body'],
    notEmpty: {
      errorMessage: 'Title is required',
    },
    isString: {
      errorMessage: 'Title must be a string',
    },
    isLength: {
      options: { min: 2 },
      errorMessage: 'Title should be at least 2 characters',
    },
  },
  'book.description': {
    in: ['body'],
    optional: true,
    isString: {
      errorMessage: 'Description must be a string',
    },
  },
  'book.publish_date': {
    in: ['body'],
    matches: {
      options: [/^\d{4}-\d{2}-\d{2}$/],
      errorMessage: 'Publish date must be in YYYY-MM-DD format',
    },
  },
  'book.author_id': {
    in: ['body'],
    notEmpty: {
      errorMessage: 'Author ID is required',
    },
    isString: {
      errorMessage: 'Author ID must be a string',
    },
  },
});

const updateBookValidationSchema = checkSchema({
  'book.title': {
    in: ['body'],
    optional: true,
    notEmpty: {
      errorMessage: 'Name is required',
    },
    isLength: {
      options: { min: 2 },
      errorMessage: 'Title should be at least 2 characters',
    },
  },
  'book.description': {
    in: ['body'],
    optional: true,
    isString: {
      errorMessage: 'Description must be a string',
    },
  },
  'book.publish_date': {
    in: ['body'],
    optional: true,
    matches: {
      options: [/^\d{4}-\d{2}-\d{2}$/],
      errorMessage: 'Publish date must be in YYYY-MM-DD format',
    },
  },
  'book.author_id': {
    in: ['body'],
    optional: true,
    isString: {
      errorMessage: 'Author ID must be a string',
    },
  },
});

export const BookValidation = {
  createBookValidationSchema,
  updateBookValidationSchema,
};
