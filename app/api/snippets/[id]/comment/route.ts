import { auth } from "@/auth";
import connectToDB from "@/db/connectToDb";
import Comment from "@/db/schema/Comment";
import Snippet from "@/db/schema/Snippet";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectToDB();
  const user = await auth();

  if (!user) {
    return NextResponse.redirect(new URL("/api/auth/signin", req.url), {
      status: 302,
    });
  }

  try {
    const { id: snippetId } = await params;
    const { comment } = await req.json();

    if (!comment) {
      return NextResponse.json({ error: "Missing comment" }, { status: 400 });
    }

    // Check if snippet exists
    const snippet = await Snippet.findById(snippetId);
    if (!snippet) {
      return NextResponse.json({ error: "Snippet not found" }, { status: 404 });
    }

    // Create comment
    const newComment = new Comment({
      snippet: snippetId,
      author: user?.user?.id,
      comment,
    });

    await newComment.save();

    // Push comment to snippet
    snippet.comments.push(newComment._id);
    await snippet.save();

    return NextResponse.json({ message: "Comment added", comment: newComment });
  } catch (err) {
    console.error("[COMMENT ERROR]", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
