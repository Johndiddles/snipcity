import { z } from "zod";

export const createSnippetFormSchema = z.object({
  title: z
    .string({ required_error: "Title is required!" })
    .min(3, { message: "Title too short!" }),
  description: z.string().optional(),
  code: z
    .string({ required_error: "Code is required!" })
    .min(10, "Code can't be less than 10 characters")
    .refine((val) => val.trim() !== "", {
      message: "Code can't be less than 10 characters!",
    }),
  language: z.string({ required_error: "Language is required!" }),
  isPublic: z.boolean(),
  tags: z.string().optional(),
});

export type CreateSnippetFormType = z.infer<typeof createSnippetFormSchema>;
