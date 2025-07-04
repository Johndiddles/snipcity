import { buildPaginatedFilter } from "@/db/buildFilters";
import connectToDB from "@/db/connectToDb";
import Snippet from "@/db/schema/Snippet";
import Vote from "@/db/schema/Vote";
import { verifyExtensionToken } from "@/lib/jwt";
import { User } from "@/types/user";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");

  await connectToDB();

  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.substring(7, authHeader.length)
    : "";
  let authUser: { id: string; email: string } | undefined;

  try {
    authUser = verifyExtensionToken(token);
  } catch (error) {
    console.log({ error });
  }

  try {
    const reqPage = request.nextUrl.searchParams.get("page");
    const reqLimit = request.nextUrl.searchParams.get("limit");

    const page = reqPage ? Number(reqPage) : 1;
    const { filter, options } = buildPaginatedFilter({
      user: !!authUser ? (authUser as User) : undefined,
      query: {
        page,
        limit: reqLimit ? Number(reqLimit) : 10,
      },
    });
    const [snippets, snippetsCount] = await Promise.all([
      await Snippet.find({ ...filter, author: authUser?.id })
        .populate({
          path: "author",
          select: "username email profileImage _id",
        })
        .populate({
          path: "comments",
          populate: {
            path: "author",
            select: "username email profileImage _id",
          },
        })
        .skip(options.skip)
        .limit(options.limit)
        .sort((options.sort as Record<string, 1 | -1>) || { createdAt: -1 }),
      await Snippet.countDocuments(filter),
    ]);

    const snippetsJSON = snippets.map((snippet) => snippet.toObject());

    await Promise.all(
      snippetsJSON.map(async (snippet, index) => {
        const existingVote = await Vote.findOne({
          snippet: snippet._id,
          user: authUser?.id,
        });
        if (existingVote) {
          snippetsJSON[index].userVote = existingVote.voteType;
        }
      })
    );

    const limit = options.limit;

    const totalPages = Math.ceil(snippetsCount / limit);

    return Response.json(
      {
        snippets: snippetsJSON,
        currentPage: page,
        totalPages,
        totalItems: snippetsCount,
        itemsPerPage: limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log({ error });
    return Response.json(
      { error: "Error fetching snippets" },
      {
        status: 500,
      }
    );
  }
}
