import { checkSchema } from 'express-validator';

export const createAuthorValidationSchema = checkSchema({
  'author.name': {
    in: ['body'],
    notEmpty: {
      errorMessage: 'Name is required',
    },
    isString: {
      errorMessage: 'Name must be a string',
    },
    isLength: {
      options: { min: 4 },
      errorMessage: 'Name should be at least 4 characters',
    },
  },
  'author.bio': {
    in: ['body'],
    optional: true,
    isString: {
      errorMessage: 'Bio must be a string',
    },
    isLength: {
      options: { min: 4 },
      errorMessage: 'Bio should be at least 4 characters',
    },
  },
  'author.birthdate': {
    in: ['body'],
    matches: {
      options: [/^\d{4}-\d{2}-\d{2}$/],
      errorMessage: 'Birthdate must be in YYYY-MM-DD format',
    },
  },
});

const updateAuthorValidationSchema = checkSchema({
  'author.name': {
    in: ['body'],
    optional: true,
    isString: {
      errorMessage: 'Name must be a string',
    },
    isLength: {
      options: { min: 4 },
      errorMessage: 'Name should be at least 4 characters',
    },
  },
  'author.bio': {
    in: ['body'],
    optional: true,
    isString: {
      errorMessage: 'Bio must be a string',
    },
    isLength: {
      options: { min: 4 },
      errorMessage: 'Bio should be at least 4 characters',
    },
  },
  'author.birthdate': {
    in: ['body'],
    optional: true,
    matches: {
      options: [/^\d{4}-\d{2}-\d{2}$/],
      errorMessage: 'Birthdate must be in YYYY-MM-DD format',
    },
  },
})

export const AuthorValidation = {
  createAuthorValidationSchema,
  updateAuthorValidationSchema
};
