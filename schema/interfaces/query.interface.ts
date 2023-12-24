import { FindOptions, Model, ModelStatic } from "sequelize";

export interface DefaultQuery {
  page?: number;
  limit?: number;
}

export interface PaginationResponse<T extends {} = any> {
  data: Model<T>[];
  currentPage: number;
  total: number;
  limit: number;
  totalPages: number;
}

export interface PaginationQuery extends DefaultQuery {
  model: ModelStatic<Model<any, any>>;
  include?: FindOptions["include"];
  query: any;
}
