import { Response, Request } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import { BookService } from './book.service';
import { IBook } from './book.interface';
import pick from '../../../shared/pick';
import { bookFilterableFields } from './author.constant';

const createBook = catchAsync(async (req: Request, res: Response) => {
  const { book } = req.body;
  const result = await BookService.createBook(book);
  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    status: 'success',
    message: 'Book created successfully',
    data: result
  });
});

const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  
    const filters = pick(req.query,bookFilterableFields)
  const paginationOptions = pick(req.query, paginationFields);
  const result = await BookService.getAllBooks(filters,paginationOptions);

  sendResponse<IBook[]>(res, {
    statusCode: httpStatus.OK,
    status: 'success',
    message: 'Books retrieved successfully',
    meta: result.meta,
    data: result.data
  });
});

const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookService.getSingleBook(id);

  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    status: 'success',
    message: 'Book retrieved successfully',
    data: result
  });
});

const updateBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { book } = req.body;
  console.log(book);
  const result = await BookService.updateBook(id, book);

  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    status: 'success',
    message: 'Book updated successfully',
    data: result
  });
});

const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookService.deleteBook(id);

  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    status: 'success',
    message: 'Book deleted successfully',
    data: result
  });
});

export const BookController = {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook
};