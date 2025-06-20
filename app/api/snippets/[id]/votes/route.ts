import { auth } from "@/auth";
import connectToDB from "@/db/connectToDb";
import Snippet from "@/db/schema/Snippet";
import User from "@/db/schema/User";
import Vote from "@/db/schema/Vote";
import { NextRequest, NextResponse } from "next/server";

// POST /api/snippets/[id]/vote
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDB();

    const session = await auth();
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: snippetId } = await params;
    const { voteType } = await req.json(); // "upvote" | "downvote"

    if (!["upvote", "downvote"].includes(voteType)) {
      return NextResponse.json({ error: "Invalid vote type" }, { status: 400 });
    }

    const user = await User.findById(session?.user?.id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const snippet = await Snippet.findById(snippetId);
    if (!snippet) {
      return NextResponse.json({ error: "Snippet not found" }, { status: 404 });
    }

    const existingVote = await Vote.findOne({
      snippet: snippet._id,
      user: user._id,
    });

    if (existingVote) {
      if (existingVote.voteType === voteType) {
        // Same vote again: remove vote
        await existingVote.deleteOne();
        if (voteType === "upvote") snippet.upvotes--;
        else snippet.downvotes--;
      } else {
        // Switch vote type
        existingVote.voteType = voteType;
        await existingVote.save();
        if (voteType === "upvote") {
          snippet.upvotes++;
          snippet.downvotes--;
        } else {
          snippet.downvotes++;
          snippet.upvotes--;
        }
      }
    } else {
      // First-time vote
      await Vote.create({
        user: user._id,
        snippet: snippet._id,
        voteType,
      });
      if (voteType === "upvote") snippet.upvotes++;
      else snippet.downvotes++;
    }

    await snippet.save();

    return NextResponse.json({
      message: "Vote recorded",
      upvotes: snippet.upvotes,
      downvotes: snippet.downvotes,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
