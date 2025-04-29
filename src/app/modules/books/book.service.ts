import { IBook, IBookFilters } from "./book.interface";
import { IGenericResponse } from '../../../interfaces/common';
import db from "../../../db";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { IPaginationOptions } from "../../../interfaces/pagination";

const getAllBooks = async (
  filters: IBookFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IBook[]>> => {

  // eslint-disable-next-line no-unused-vars
  const { searchTerm, ...filtersData } = filters;
  const {author} = filtersData as any;
  const { page, limit, skip } = paginationHelper(paginationOptions);
  
  const result = await db<IBook>("book")
  .modify((query) => {
    if (searchTerm) {
      query.where("title", "ilike", `%${searchTerm}%`);
    }
    if (author) {
      query.where("author_id", author);
    }
  })
  .select("*")
  .limit(limit)
  .offset(skip);

  return {
    meta: {
      page,
      limit,
      total: result.length || 0,
    },
    data: result,
  };
};

const getSingleBook = async (id: string): Promise<IBook | undefined> => {
  const result = await db<IBook>("book")
    .where({ id })
    .first();
  return result;
};

const createBook = async (payload: IBook): Promise<IBook> => {
   
  const {author_id} = payload
  const isAuthorExist = await db<IBook>('author').where({ id: author_id }).first();

  if (!isAuthorExist) {
    throw new Error("Author id is not exist");
  }
  const [result] = await db<IBook>("book").insert(payload).returning("*");
  return result;
};

const updateBook = async (
  id: string,
  payload: Partial<IBook>
): Promise<IBook> => {
  const result = await db<IBook>("book")
    .where({ id })
    .update(payload)
    .returning("*");
  return result[0];
};

const deleteBook = async (id: string): Promise<IBook> => {
  const isBookExist = await db<IBook>('book').where({ id }).first();
  if (!isBookExist) {
    throw new Error('Book not found');
  }
  const [result] = await db<IBook>("book")
    .where({ id })
    .delete()
    .returning("*");
  return result;
};

export const BookService = {
  getAllBooks,
  getSingleBook,
  createBook,
  updateBook,
  deleteBook
};
