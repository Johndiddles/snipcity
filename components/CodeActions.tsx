import { Snippet } from "@/types/snippet";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";

const CodeActions = ({ snippet }: { snippet: Snippet }) => {
  const tags = snippet.tags?.split(",") || [];
  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.code);
    toast.success("Code copied to clipboard!");
  };
  return (
    <div className="flex flex-wrap space-y-4 items-center justify-between p-4 border-b">
      <div className="flex items-center gap-2">
        <Badge variant="secondary">{snippet.language}</Badge>
        {tags.map((tag: string) => (
          <Badge key={tag} variant="outline" className="text-xs">
            {tag}
          </Badge>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={handleCopy}>
          <Copy className="h-4 w-4 mr-2" />
          Copy
        </Button>
      </div>
    </div>
  );
};

export default CodeActions;
