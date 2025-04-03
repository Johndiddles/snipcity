import connectToDB from "@/db/connectToDb";
import Vote from "@/db/schema/Vote";
import Snippet from "@/db/schema/Snippet";

export async function POST(req: Request) {
  await connectToDB();

  try {
    const { snippet, user, voteType } = await req.json();

    if (!snippet || !user || !voteType) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!["upvote", "downvote"].includes(voteType)) {
      return Response.json({ error: "Invalid vote type" }, { status: 400 });
    }

    const existingVote = await Vote.findOne({ snippet, user });

    if (existingVote) {
      if (existingVote.voteType === voteType) {
        await Vote.findByIdAndDelete(existingVote._id);
        const updateField =
          voteType === "upvote"
            ? { $inc: { upvotes: -1 } }
            : { $inc: { downvotes: -1 } };
        await Snippet.findByIdAndUpdate(snippet, updateField);
        return Response.json({ message: "Vote removed" }, { status: 200 });
      } else {
        existingVote.voteType = voteType;
        await existingVote.save();
        const updateFields =
          voteType === "upvote"
            ? { $inc: { upvotes: 1, downvotes: -1 } }
            : { $inc: { downvotes: 1, upvotes: -1 } };
        await Snippet.findByIdAndUpdate(snippet, updateFields);
        return Response.json(
          { message: `Changed vote to ${voteType}` },
          { status: 200 }
        );
      }
    } else {
      const newVote = new Vote({ snippet, user, voteType });
      await newVote.save();
      const updateField =
        voteType === "upvote"
          ? { $inc: { upvotes: 1 } }
          : { $inc: { downvotes: 1 } };
      await Snippet.findByIdAndUpdate(snippet, updateField);
      return Response.json(
        { message: `Successfully ${voteType}d` },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Error processing vote:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
