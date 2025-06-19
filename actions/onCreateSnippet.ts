"use server";

import { auth } from "@/auth";
import { createSnippet } from "@/db/models/createSnippet";
import {
  createSnippetFormSchema,
  CreateSnippetFormType,
} from "@/db/schema/CreateSnippet";
// import { ISnippet } from "@/db/schema/Snippet";

export type FormState = {
  message: string;
  status?: "success" | "failed";
  fields?: Record<string, string>;
  issues?: string[];
};

export const onCreateSnippetAction: (
  prevState: FormState,
  payload: CreateSnippetFormType
) => Promise<FormState> = async (
  prevState: FormState,
  payload: CreateSnippetFormType
) => {
  console.log("Start creating snippet", payload);
  //   const formData = Object.fromEntries(payload);
  const parsedData = createSnippetFormSchema.safeParse(payload);

  if (!parsedData.success) {
    console.log("failed to parse payload");
    const fields: Record<string, string> = payload as unknown as Record<
      string,
      string
    >;
    // Object.keys(formData).forEach((key) => {
    //   fields[key] = formData[key].toString();
    // });

    return {
      message: "Invalid form data",
      fields,
      issues: parsedData.error.issues.map((issue) => issue.message),
      status: "failed",
    };
  }

  console.log({ parsedData });

  try {
    const session = await auth();
    await createSnippet({
      ...parsedData.data,
      code: parsedData.data.code.trim().toString(),
      author: session?.user?.id as string,
    });

    console.log("Snippet created successfully");

    return {
      message: "Snippet created successfully",
      status: "success",
    };
  } catch (error) {
    console.log({ error });
    return {
      message: "Failed to create snippet",
      status: "failed",
    };
  }
};
