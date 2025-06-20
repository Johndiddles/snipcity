import { auth } from "@/auth";
import { buildPaginatedFilter } from "@/db/buildFilters";
import connectToDB from "@/db/connectToDb";
import { createSnippet } from "@/db/models/createSnippet";
import Snippet from "@/db/schema/Snippet";
import Vote from "@/db/schema/Vote";
import { User } from "@/types/user";

export async function GET() {
  const authUser = await auth();
  await connectToDB();

  try {
    const { filter, options } = buildPaginatedFilter({
      user: authUser?.user as User,
      query: {},
    });
    const snippets = await Snippet.find(filter)
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
      .sort((options.sort as Record<string, 1 | -1>) || { createdAt: -1 });

    const snippetsJSON = snippets.map((snippet) => snippet.toObject());

    await Promise.all(
      snippetsJSON.map(async (snippet, index) => {
        const existingVote = await Vote.findOne({
          snippet: snippet._id,
          user: authUser?.user?.id,
        });
        if (existingVote) {
          snippetsJSON[index].userVote = existingVote.voteType;
        }
      })
    );

    return Response.json(
      { snippets: snippetsJSON },
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

export async function POST(req: Request) {
  await connectToDB();

  const payload = await req.json();
  const session = await auth();

  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const snippet = await createSnippet({
      ...payload,
      code: payload.code.trim().toString(),
      author: session?.user?.id,
    });
    return Response.json(snippet, {
      status: 201,
    });
  } catch (error) {
    console.log({ error });
    return Response.json(
      { error: "Error creating snippet" },
      {
        status: 500,
      }
    );
  }
}
