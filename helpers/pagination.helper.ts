import { PaginationQuery, PaginationResponse } from "../schema/interfaces/query.interface";

export default async function paginate<T extends {}>({
  model,
  page,
  limit,
  query,
  include,
}: PaginationQuery): Promise<PaginationResponse<T>> {
  page = page || 1;
  limit = limit || 10;

  return await model
    .findAndCountAll({
      where: { ...query },
      order: [["createdAt", "asc"]],
      offset: (page - 1) * limit,
      limit,
      include,
    })
    .then(async ({ rows: data, count: total }) => {
      return {
        data,
        currentPage: page as number,
        limit: limit as number,
        total,
        totalPages: Math.ceil(total / (limit as number)),
      };
    });
}
