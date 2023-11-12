import { ObjectType } from "dynamoose/dist/General";

export type PaginationResponse<T> = {
  data: T;
  lastKey: ObjectType;
};
