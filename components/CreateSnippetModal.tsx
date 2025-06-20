"use client";
import { Save, Code, Eye, EyeOff } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Form, useForm } from "react-hook-form";
import {
  createSnippetFormSchema,
  CreateSnippetFormType,
} from "@/db/schema/CreateSnippet";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField, FormItem } from "./ui/form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Snippet } from "@/types/snippet";
import { languages } from "@/mockData/languages";
import { QUERY_KEYS } from "@/constants/queries";

interface CreateSnippetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSnippetCreated?: (snippet: Snippet) => void;
}

const CreateSnippetModal = ({ isOpen, onClose }: CreateSnippetModalProps) => {
  const queryClient = useQueryClient();
  const form = useForm<CreateSnippetFormType>({
    resolver: zodResolver(createSnippetFormSchema),
    defaultValues: {
      title: "",
      description: "",
      code: "",
      language: "javascript",
      isPublic: true,
    },
  });
  const { toast } = useToast();

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const { mutate, isPending, error } = useMutation({
    mutationFn: async (data: CreateSnippetFormType) => {
      return await fetch("/api/snippets", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Your snippet has been created successfully.",
      });
      queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.FETCH_ALL_SNIPPETS],
      });
      handleClose();
    },
    onError: (error) => {
      console.log({ error });
      toast({
        title: "Error",
        description: "Failed to create snippet. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = async (data: CreateSnippetFormType) => {
    mutate({
      ...data,
      code: data.code.trim().toString(),
      title: data.title.trim().toString(),
      description: (data.description || "").trim().toString(),
      tags: data?.tags?.trim().toString(),
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[95vh] overflow-y-auto mx-4 sm:mx-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg md:text-xl">
            <Code className="h-5 w-5" />
            Create New Snippet
          </DialogTitle>
          <DialogDescription className="text-sm md:text-base">
            Create a new code snippet to save and share with others.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          {error && <div className="text-red-500">{error.message}</div>}

          <form className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="title" className="text-sm font-medium">
                        Title *
                      </Label>
                      {/* <FormControl> */}
                      <Input
                        id="title"
                        placeholder="Enter snippet title"
                        required
                        className="text-sm md:text-base"
                        //  value={title}
                        //  onChange={(e) => setTitle(e.target.value)}
                        {...field}
                      />
                      {/* </FormControl> */}
                      {/* <FormMessage /> */}
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="language"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="language" className="text-sm font-medium">
                        Language *
                      </Label>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        required
                      >
                        <SelectTrigger className="text-sm md:text-base">
                          <SelectValue placeholder="Select a language" />
                        </SelectTrigger>
                        <SelectContent>
                          {languages.map((lang) => (
                            <SelectItem
                              key={lang}
                              value={lang}
                              className="text-sm"
                            >
                              {lang}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="space-y-2">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <Label
                      htmlFor="description"
                      className="text-sm font-medium"
                    >
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Describe what this snippet does..."
                      rows={3}
                      className="text-sm md:text-base resize-none"
                      {...field}
                      // value={description}
                      // onChange={(e) => setDescription(e.target.value)}
                    />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-2">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="code" className="text-sm font-medium">
                      Code *
                    </Label>
                    <Textarea
                      id="code"
                      placeholder="Paste your code here..."
                      rows={8}
                      className="font-mono text-xs md:text-sm resize-none"
                      required
                      {...field}
                      // value={code}
                      // onChange={(e) => setCode(e.target.value)}
                    />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-2">
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="tags" className="text-sm font-medium">
                      Tags
                    </Label>
                    <Input
                      id="tags"
                      placeholder="Enter tags separated by commas"
                      className="text-sm md:text-base"
                      {...field}
                    />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex items-center justify-between py-2">
              <FormField
                control={form.control}
                name="isPublic"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <Switch
                      id="private"
                      checked={!field.value}
                      onCheckedChange={(checked) => field.onChange(!checked)}
                    />
                    <Label
                      htmlFor="private"
                      className="flex items-center gap-2 text-sm font-medium"
                    >
                      {!field.value ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                      {!field.value ? "Private" : "Public"}
                    </Label>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isPending}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
              <Button
                disabled={isPending}
                onClick={(e) => {
                  e.preventDefault();

                  form.handleSubmit(onSubmit)();
                }}
                className="gap-2 w-full sm:w-auto"
              >
                {isPending ? (
                  "Creating..."
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Create Snippet
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateSnippetModal;
