export type PaginationParams = {
  page: number;
  perPage: number;
  skip: number;
};

export const getPaginationParams = (query: any) => {
  const page: number = query.page ? +query.page : 1;
  const perPage: number = query.perPage ? +query.perPage : 10;

  return { page, perPage, skip: page > 1 ? perPage * page : 0 };
};
