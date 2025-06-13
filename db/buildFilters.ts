import { FilterQuery } from "mongoose";
import { User } from "@/types/user";

// export const buildFilter = (props: TBuildTaskFilterType, user: User) => {
//   const filter: FilterQuery<Record<string, unknown>> = { ...props };

//   if (props.startDate || props.endDate) {
//     filter.createdAt = {};
//     if (props.startDate) {
//       filter.createdAt.$gte = new Date(props.startDate as string);
//     }
//     if (props.endDate) {
//       filter.createdAt.$lte = new Date(props.endDate as string);
//     }

//     delete filter.startDate;
//     delete filter.endDate;
//   }

//   if (user?.role === UserRole.COORDINATOR) filter.createdBy = user._id;
//   if (user?.role !== UserRole.SUPERADMIN)
//     filter.organization = user.organization;
//   if (user?.role !== UserRole.SUPERADMIN) filter.isDeleted = false;
//   return filter;
// };

// export type TFilterQueryWithUser = {
//   query: TFilterQuery;
//   user: User;
// };

// const parseQueryParams = (query: PaginationQuery) => {
//   const page = Math.max(1, parseInt(query.page || "1", 10));
//   const limit = Math.min(100, Math.max(1, parseInt(query.limit || "10", 10)));

//   return { page, limit };
// };

// export type ListDataProps = {
//   user: User;
//   query: TFilterQuery;
// };
// export const buildPaginatedFilter = (user: User, query: TFilterQuery = {}) => {
//   const { page, limit } = query
//     ? parseQueryParams(query)
//     : { page: 1, limit: 10 };

//   const skip = (page - 1) * limit;

//   delete query.limit;
//   delete query.page;

//   const filterFromQuery = buildFilter(query, user);
//   const filter = {
//     ...filterFromQuery,
//   };

//   return { filter, skip, limit, page };
// };

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
