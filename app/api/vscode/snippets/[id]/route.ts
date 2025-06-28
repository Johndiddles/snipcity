import connectToDB from "@/db/connectToDb";
import { updateSnippet } from "@/db/models/updateSnippet";
import { verifyExtensionToken } from "@/lib/jwt";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const authHeader = request.headers.get("authorization");

  await connectToDB();

  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.substring(7, authHeader.length)
    : "";

  let authUser: { id: string; email: string } | undefined;

  try {
    authUser = verifyExtensionToken(token);
  } catch (error) {
    console.log({ error });
    return Response.json({ error: "Invalid token" }, { status: 401 });
  }

  const { id } = await params;

  const payload = await request.json();
  try {
    if (!!payload.author) delete payload.author;

    const snippet = await updateSnippet(id, authUser?.id as string, {
      ...payload,
      code: payload.code.trim().toString(),
    });
    return Response.json(snippet, {
      status: 201,
    });
  } catch (error) {
    console.log({ error });
    return Response.json(
      { error: "Error updating snippet" },
      {
        status: 500,
      }
    );
  }
}
