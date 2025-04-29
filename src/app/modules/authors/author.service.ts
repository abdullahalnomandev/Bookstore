import { IAuthor, IAuthorFilters } from "./author.interface";
import { IGenericResponse } from '../../../interfaces/common';
import db from "../../../db";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { IPaginationOptions } from "../../../interfaces/pagination";

const getAllAuthors = async (
    filters: IAuthorFilters,
    paginationOptions: IPaginationOptions,
 ): Promise<IGenericResponse<IAuthor[]>> => {
    
  // eslint-disable-next-line no-unused-vars
  const { searchTerm, ...filtersData } = filters;

  const { page, limit, skip } = paginationHelper(paginationOptions);
  
  const result = await db<IAuthor>("author")
  .where("name", "ilike", `%${searchTerm || ""}%`) 
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

const getSingleAuthor = async (id: string): Promise<IAuthor | undefined> => {
  const result = await db<IAuthor>("author")
    .where({ id })
    .first();
  return result;
};

const createAuthor = async (payload: IAuthor): Promise<IAuthor> => {
  const [result] = await db<IAuthor>("author").insert(payload).returning("*");
  return result;
};

const updateAuthor = async (
  id: string,
  payload: Partial<IAuthor>
): Promise<IAuthor> => {
  const result = await db<IAuthor>("author")
    .where({ id })
    .update(payload)
    .returning("*");
  return result[0];
};

const deleteAuthor = async (id: string): Promise<IAuthor> => {

    const isAuthorExist = await db<IAuthor>('author').where({ id }).first();
    if(!isAuthorExist){
        throw new Error('Author not found');
    }
  const [result] = await db<IAuthor>("author")
    .where({ id })
    .delete()
    .returning("*");
  return result;
};

export const AuthorService = {
  getAllAuthors,
  getSingleAuthor,
  createAuthor,
  updateAuthor,
  deleteAuthor,
};
