import { Response, Request } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import { AuthorService } from './author.service';
import { IAuthor } from './author.interface';
import pick from '../../../shared/pick';
import { authorFilterableFields } from './author.constant';

const createAuthor = catchAsync(async (req:Request,res:Response) => {

  const { author } = req.body;
  const result = await AuthorService.createAuthor(author);
  sendResponse<IAuthor>(res,{
    statusCode:httpStatus.OK,
    status:'success',
    message: 'Author created successfully',
    data: result
  });
})

const getAllAuthors = catchAsync(async (req:Request, res:Response) => {
 
     const filters = pick(req.query,authorFilterableFields)
    const paginationOptions = pick(req.query,paginationFields);

   const result = await AuthorService.getAllAuthors( filters, paginationOptions);

  sendResponse<IAuthor[]>(res,{
    statusCode:httpStatus.OK,
    status:'success',
    message: 'Author retrieved successfully',
    meta:result.meta,
    data: result.data
  });

})
const getSingleAuthor = catchAsync(async (req:Request, res:Response) => {
 

   const {id} = req.params; 
   const result = await AuthorService.getSingleAuthor(id);
   
  sendResponse<IAuthor>(res,{
    statusCode:httpStatus.OK,
    status:'success',
    message: 'Author retrieved successfully',
    data: result
  });

})

const updateAuthor = catchAsync(async (req:Request, res:Response) => {
 
    const {id} = req.params; 
    const {author} = req.body;
    const result = await AuthorService.updateAuthor(id, author);
   
  sendResponse<IAuthor>(res,{
    statusCode:httpStatus.OK,
    status:'success',
    message: 'Author updated successfully',
    data: result
  });

});

const deleteAuthor = catchAsync(async (req:Request, res:Response) => {
 
    const {id} = req.params; 
    const result = await AuthorService.deleteAuthor(id);
   
  sendResponse<IAuthor>(res,{
    statusCode:httpStatus.OK,
    status:'success',
    message: 'Author deleted successfully',
    data: result
  });

})

export const AuthorController = {
  createAuthor,
  getAllAuthors,
  getSingleAuthor,
  updateAuthor,
  deleteAuthor
};
