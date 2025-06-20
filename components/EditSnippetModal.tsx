import { useState } from "react";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
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
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { languages } from "@/mockData/languages";
import { Snippet } from "@/types/snippet";

interface EditSnippetModalProps {
  snippet: Snippet;
  isOpen: boolean;
  onClose: () => void;
  onSnippetUpdated: (snippet: Snippet) => void;
}

const EditSnippetModal = ({
  snippet,
  isOpen,
  onClose,
  onSnippetUpdated,
}: EditSnippetModalProps) => {
  const [title, setTitle] = useState(snippet.title || "");
  const [description, setDescription] = useState(snippet.description || "");
  const [code, setCode] = useState(snippet.code || "");
  const [language, setLanguage] = useState(snippet.language || "");
  const [visibility, setVisibility] = useState("public");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>(snippet.tags?.split(",") || []);

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedSnippet = {
      ...snippet,
      title,
      description,
      code,
      language,
      isPublic: visibility === "isPublic",
      tags: tags.join(", "),
    };

    onSnippetUpdated(updatedSnippet);
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0">
        <div className="flex flex-col h-full">
          <DialogHeader className="p-6 border-b">
            <div className="flex items-center justify-between">
              <DialogTitle>Edit Snippet</DialogTitle>
              <Button variant="ghost" size="icon" onClick={handleClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>

          <div className="flex-1 overflow-auto p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter snippet title"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe what your snippet does"
                      className="min-h-[100px]"
                    />
                  </div>

                  <div>
                    <Label htmlFor="language">Language *</Label>
                    <Select
                      value={language}
                      onValueChange={setLanguage}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map((lang) => (
                          <SelectItem key={lang} value={lang}>
                            {lang}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Visibility</Label>
                    <RadioGroup
                      value={visibility}
                      onValueChange={setVisibility}
                      className="mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="public" id="public" />
                        <Label htmlFor="public">Public</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="private" id="private" />
                        <Label htmlFor="private">Private</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label htmlFor="tags">Tags</Label>
                    <div className="flex gap-2 mt-2">
                      <Input
                        id="tags"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Add tags"
                      />
                      <Button
                        type="button"
                        onClick={handleAddTag}
                        variant="outline"
                      >
                        Add
                      </Button>
                    </div>
                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="cursor-pointer"
                            onClick={() => handleRemoveTag(tag)}
                          >
                            {tag} ×
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Column - Code */}
                <div className="space-y-4">
                  <div className="h-full">
                    <Label htmlFor="code">Code *</Label>
                    <Textarea
                      id="code"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="Paste your code here"
                      className="min-h-[400px] font-mono text-sm"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button type="button" variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
                <Button type="submit">Update Snippet</Button>
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditSnippetModal;
