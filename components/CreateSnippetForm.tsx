"use client";
import React, { useActionState, useRef } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "./ui/button";
import {
  CreateSnippetFormType,
  createSnippetFormSchema,
} from "@/db/schema/CreateSnippet";
import { onCreateSnippetAction } from "@/actions/onCreateSnippet";
import dynamic from "next/dynamic";
import { Switch } from "./ui/switch";

const CodeEditor = dynamic(() => import("./CodeEditor"), {
  ssr: false,
  loading: () => (
    <div className="text-gray-600 text-sm animate-pulse h-[100px] border border-gray-200 rounded-lg shadow-lg flex justify-center items-center">
      <p>Loading code editor... </p>
    </div>
  ),
});

const supportedLanguages = [
  {
    value: "html",
    label: "HTML",
  },
  {
    value: "css",
    label: "CSS",
  },
  {
    value: "javascript",
    label: "JavaScript",
  },
  {
    value: "typescript",
    label: "TypeScript",
  },
  {
    value: "python",
    label: "Python",
  },
  {
    value: "java",
    label: "Java",
  },
];

const CreateSnippetForm = () => {
  const createSnippetFormRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useActionState(onCreateSnippetAction, {
    message: "",
  });
  const form = useForm<CreateSnippetFormType>({
    resolver: zodResolver(createSnippetFormSchema),
    defaultValues: {
      title: "",
      description: "",
      code: "",
      language: "javascript",
      isPublic: true,
      ...(state?.fields ?? {}),
    },
  });
  return (
    <Form {...form}>
      {state?.message !== "" && !state.issues && (
        <div className="text-red-500">{state.message}</div>
      )}
      {state?.issues && (
        <div className="text-red-500">
          <ul>
            {state.issues.map((issue) => (
              <li key={issue} className="flex gap-1">
                {issue}
              </li>
            ))}
          </ul>
        </div>
      )}
      <form
        ref={createSnippetFormRef}
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit((formData) => formAction(formData))(e);
        }}
        className="space-y-4 mt-4"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe what the snippet does"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Language</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full max-w-[200px]">
                    <SelectValue placeholder="Select a language" />
                  </SelectTrigger>
                  <SelectContent>
                    {supportedLanguages.map((language, index) => (
                      <SelectItem key={index} value={language.value}>
                        {language.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Code Snippet</FormLabel>
              <FormControl>
                <CodeEditor
                  language={form.watch("language")}
                  code={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isPublic"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormLabel>Share with everyone</FormLabel>

              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full font-semibold text-lg py-6 cursor-pointer mt-8"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default CreateSnippetForm;
