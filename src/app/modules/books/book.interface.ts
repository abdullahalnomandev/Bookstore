export type IBook = {
    id: string;
    title: string;
    description?: string;
    publish_date: string;
    author_id: string;
  };    

  export type IBookFilters = {
    searchTerm?: string;
    title?: string;
  }