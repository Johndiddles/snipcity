"use server";
import connectToDB from "@/db/connectToDb";
import User, { IUser } from "@/db/schema/User";

export type CreateUserPayload = Pick<
  IUser,
  "username" | "email" | "authProvider" | "profileImage" | "user_provider_id"
>;

interface CreateUserPayloadResponse {
  user: IUser | null;
  error: string | null;
}

export const createUser: (
  payload: CreateUserPayload
) => Promise<CreateUserPayloadResponse> = async (payload) => {
  try {
    await connectToDB();
    const existingUser = await User.findOne({
      user_provider_id: payload.user_provider_id,
      authProvider: payload.authProvider,
    });

    let user;
    if (!!existingUser) {
      user = (
        await User.findOneAndUpdate(
          {
            user_provider_id: payload.user_provider_id,
            authProvider: payload.authProvider,
          },
          payload
        )
      )._doc;
    } else {
      const newUser = new User(payload);
      await newUser.save();
      user = newUser;
    }
    return { user, error: null };
  } catch (error) {
    console.log({ error });
    const handledError = handleError(error);
    return { error: handledError, user: null };
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleError = (error: any) => {
  if ("code" in error) {
    switch (error.code) {
      case 11000:
        return "User already exists with this email address";
      case 121:
        return "Document validation failed";
      default:
        return `Unkown Error`;
    }
  } else {
    return "Unknown Error";
  }
};
