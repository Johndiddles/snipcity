import { auth } from "@/auth";
import connectToDB from "@/db/connectToDb";
import Snippet, { ISnippet } from "@/db/schema/Snippet";
import { IUser } from "@/db/schema/User";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  console.log({ req });
  await connectToDB();
  const { id } = await params;
  console.log({ id });

  const user = await auth();
  try {
    const snippet: ISnippet | null = await Snippet.findById(id).populate({
      path: "author",
      model: "User",
      select: "username email profileImage _id",
    });
    if (
      !snippet ||
      (!snippet.isPublic &&
        (snippet.author as IUser)._id.toString() !== user?.user?.id)
    ) {
      return Response.json({ error: "Snippet not found" }, { status: 404 });
    }
    return Response.json(
      { snippet },
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
