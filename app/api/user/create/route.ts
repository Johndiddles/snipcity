import connectToDB from "@/db/connectToDb";
import { createUser, CreateUserPayload } from "@/db/models/createUser";
// import User from "@/db/schema/User";

export async function POST(req: Request) {
  await connectToDB();

  const payload = await req.json();
  console.log({ payload });

  try {
    const { user, error } = await createUser(payload as CreateUserPayload);
    // const user = await User.findOneAndUpdate(
    //   { email: payload.email, authProvider: payload.authProvider },
    //   payload,
    //   {
    //     upsert: true,
    //   }
    // );

    // console.log({ user });
    if (error) {
      return Response.json({ error }, { status: 400 });
    }
    return Response.json(
      { user },
      {
        status: 201,
      }
    );
  } catch (error) {
    return handleError(error);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleError = (error: any) => {
  if ("code" in error) {
    switch (error.code) {
      case 11000:
        return Response.json(
          { error: "User already exists with this email address" },
          {
            status: 409,
          }
        );
      case 121:
        return Response.json(
          { error: "Document validation failed" },
          { status: 400 }
        );
      default:
        return Response.json({ error: `Unkown Error` }, { status: 500 });
    }
  } else {
    return Response.json({ error: "Unknown Error" }, { status: 500 });
  }
};
