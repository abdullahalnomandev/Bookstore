export type IAuthor = {
    id: string;
    name: string;
    bio?: string;
    birthdate: string;
  };

  export type IAuthorFilters = {
    searchTerm?: string;
    name?: string;
  }