import connectToDB from "../connectToDb";
import Snippet from "../schema/Snippet";
import { CreateSnippetPayload } from "./createSnippet";

export const updateSnippet = async (
  id: string,
  payload: Omit<CreateSnippetPayload, "author">
) => {
  try {
    await connectToDB();
    const updatedSnippet = await Snippet.findByIdAndUpdate(id, payload, {
      new: true,
    });

    return updatedSnippet;
  } catch (error) {
    console.log({ error });
    throw new Error(JSON.stringify(error) as string);
  }
};
