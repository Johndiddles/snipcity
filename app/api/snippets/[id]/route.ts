import { auth } from "@/auth";
import connectToDB from "@/db/connectToDb";
import Snippet from "@/db/schema/Snippet";
import { IUser } from "@/db/schema/User";
import Vote, { IVote } from "@/db/schema/Vote";
import { Snippet as TSnippet } from "@/types/snippet";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // console.log({ req });
  await connectToDB();
  const { id } = await params;
  // console.log({ id });

  const user = await auth();
  try {
    const snippet = await Snippet.findById(id)
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
      });
    if (
      !snippet ||
      (!snippet.isPublic &&
        (snippet.author as IUser)._id.toString() !== user?.user?.id)
    ) {
      return Response.json({ error: "Snippet not found" }, { status: 404 });
    }

    const existingVote: IVote | null = await Vote.findOne({
      snippet: snippet._id,
      user: user?.user?.id,
    });

    return Response.json(
      {
        snippet: {
          ...(snippet.toJSON() as TSnippet),
          userVote: existingVote ? existingVote.voteType : null,
        },
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
