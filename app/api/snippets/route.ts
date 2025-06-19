import { auth } from "@/auth";
import { buildPaginatedFilter } from "@/db/buildFilters";
import connectToDB from "@/db/connectToDb";
import { createSnippet } from "@/db/models/createSnippet";
import Snippet, { ISnippet } from "@/db/schema/Snippet";
// import UserSchema from "@/db/schema/User";
import { User } from "@/types/user";

export async function GET() {
  const authUser = await auth();
  // console.log({ authUser });
  await connectToDB();

  try {
    const { filter, options } = buildPaginatedFilter({
      user: authUser?.user as User,
      query: {},
    });
    const snippets: ISnippet[] = await Snippet.find(filter)
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
    return Response.json(snippets, {
      status: 200,
    });
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
  console.log({ payload });
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
