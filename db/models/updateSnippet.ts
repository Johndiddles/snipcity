import connectToDB from "../connectToDb";
import Snippet from "../schema/Snippet";
import { CreateSnippetPayload } from "./createSnippet";

export const updateSnippet = async (
  id: string,
  userId: string,
  payload: Omit<CreateSnippetPayload, "author">
) => {
  try {
    await connectToDB();
    const snippet = await Snippet.findById(id);
    if (!snippet) {
      throw new Error("Snippet not found");
    }
    if (snippet.author.toString() !== userId) {
      throw new Error("Unauthorized");
    }

    snippet.set(payload);
    const updatedSnippet = await snippet.save();

    return updatedSnippet;
  } catch (error) {
    console.log({ error });
    throw new Error(JSON.stringify(error) as string);
  }
};
