import connectToDB from "@/db/connectToDb";
import { updateSnippet } from "@/db/models/updateSnippet";
import Snippet from "@/db/schema/Snippet";
import { IUser } from "@/db/schema/User";
import Vote, { IVote } from "@/db/schema/Vote";
import { verifyExtensionToken } from "@/lib/jwt";
import { NextRequest } from "next/server";
import { Snippet as TSnippet } from "@/types/snippet";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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
    return Response.json({ error: "Invalid token" }, { status: 401 });
  }

  await connectToDB();
  const { id } = await params;
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
        (snippet.author as IUser)._id.toString() !== authUser?.id)
    ) {
      return Response.json({ error: "Snippet not found" }, { status: 404 });
    }

    const existingVote: IVote | null = await Vote.findOne({
      snippet: snippet._id,
      user: authUser?.id,
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

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
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
    return Response.json({ error: "Invalid token" }, { status: 401 });
  }

  const { id } = await params;

  const payload = await request.json();
  try {
    if (!!payload.author) delete payload.author;

    const snippet = await updateSnippet(id, authUser?.id as string, {
      ...payload,
      code: payload.code.trim().toString(),
    });
    return Response.json(snippet, {
      status: 201,
    });
  } catch (error) {
    console.log({ error });
    return Response.json(
      { error: "Error updating snippet" },
      {
        status: 500,
      }
    );
  }
}
