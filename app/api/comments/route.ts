import connectToDB from "@/db/connectToDb";
import Comment from "@/db/schema/Comment";

export async function POST(req: Request) {
  const payload = await req.json();

  await connectToDB();

  try {
    const comment = new Comment(payload);
    await comment.save();
    return Response.json(comment, { status: 201 });
  } catch (error) {
    console.log({ error });
    return Response.json({ error: "Error creating comment" }, { status: 500 });
  }
}
