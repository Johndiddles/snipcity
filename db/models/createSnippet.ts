import connectToDB from "../connectToDb";
import Snippet, { ISnippet } from "../schema/Snippet";

export type CreateSnippetPayload = Pick<
  ISnippet,
  "title" | "description" | "code" | "language" | "isPublic" | "author"
>;
export const createSnippet = async (payload: CreateSnippetPayload) => {
  try {
    await connectToDB();
    const snippet = new Snippet(payload);
    await snippet.save();

    return snippet;
  } catch (error) {
    console.log({ error });
  }
};
