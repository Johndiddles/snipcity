"use server";

import { auth } from "@/auth";
import { createSnippet } from "@/db/models/createSnippet";
import {
  createSnippetFormSchema,
  CreateSnippetFormType,
} from "@/db/schema/CreateSnippet";

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
  const parsedData = createSnippetFormSchema.safeParse(payload);

  if (!parsedData.success) {
    const fields: Record<string, string> = payload as unknown as Record<
      string,
      string
    >;

    return {
      message: "Invalid form data",
      fields,
      issues: parsedData.error.issues.map((issue) => issue.message),
      status: "failed",
    };
  }

  try {
    const session = await auth();
    await createSnippet({
      ...parsedData.data,
      code: parsedData.data.code.trim().toString(),
      author: session?.user?.id as string,
    });

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
