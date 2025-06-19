import { FilterQuery } from "mongoose";
import { User } from "@/types/user";

export type TBuildTaskFilterType = {
  startDate?: string;
  endDate?: string;
  language?: string;
  isPublic?: boolean;
  author?: string;
};

interface PaginationQuery {
  page?: number;
  limit?: number;
}

export type TFilterQuery = PaginationQuery & TBuildTaskFilterType;

interface buildPaginatedFilterProps {
  user?: User;
  query: TFilterQuery;
}
export const buildPaginatedFilter = ({
  user,
  query,
}: buildPaginatedFilterProps) => {
  const { page = 1, limit = 10 } = query;
  const queryFilter: FilterQuery<Record<string, unknown>> = {
    $or: [{ isPublic: true }, { author: user?.id }],
  };

  // Add language, isPublic, author filters only if explicitly provided
  const andConditions = [];

  if (query.language) {
    andConditions.push({ language: query.language });
  }

  if (typeof query.isPublic === "boolean") {
    andConditions.push({ isPublic: query.isPublic });
  }

  if (query.author) {
    andConditions.push({ author: query.author });
  }

  if (andConditions.length > 0) {
    queryFilter.$and = andConditions;
  }

  // Pagination
  const skip = (page - 1) * limit;

  return {
    filter: queryFilter,
    options: {
      skip,
      limit,
      sort: { createdAt: -1 }, // optional: latest first
    },
  };
};
