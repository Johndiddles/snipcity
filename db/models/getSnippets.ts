import connectToDB from "@/db/connectToDb";
import Snippet from "@/db/schema/Snippet";

export const getSnippets = async () => {
  await connectToDB();
  return (await Snippet.find({ isPublic: true }).populate("author")) || [];
};
