import connectToDB from "@/db/connectToDb";
import Snippet, { ISnippet } from "@/db/schema/Snippet";

export async function GET() {
  await connectToDB();

  try {
    const snippets: ISnippet[] = await Snippet.find();
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
