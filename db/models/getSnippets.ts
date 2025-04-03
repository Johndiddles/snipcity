import connectToDB from "@/db/connectToDb";
import Snippet from "@/db/schema/Snippet";
import User from "../schema/User";

export const getSnippets = async () => {
  await connectToDB();
  return (
    (await Snippet.find({ isPublic: true }).populate({
      path: "author",
      model: User,
      select: "username email profileImage _id",
    })) || []
  );
};
