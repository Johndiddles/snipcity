import {
  Heart,
  MessageCircle,
  Share,
  Lock,
  Globe,
  Copy,
  MoreHorizontal,
  Eye,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { toast } from "sonner";
import { Snippet } from "@/types/snippet";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import Link from "next/link";

interface SnippetCardProps {
  snippet: Snippet;
  onView: (snippet: Snippet) => void;
}

const SnippetCard = ({ snippet, onView }: SnippetCardProps) => {
  const tags = snippet.tags?.split(",") || [];
  const [isLiked, setIsLiked] = useState(false);
  const [votes, setVotes] = useState<number>(snippet.upvotes);

  const handleVote = () => {
    setIsLiked(!isLiked);
    setVotes(isLiked ? votes - 1 : votes + 1);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.code);
    toast.success("Code copied to clipboard!");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/snippets/${snippet._id}`
    );
    toast.success("Link copied to clipboard!");
  };

  return (
    <Link href={`/snippets/${snippet._id}`} passHref>
      <Card className="snippet-card hover:shadow-lg transition-all duration-200 group cursor-pointer flex flex-col">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                {snippet.title}
              </h3>
              <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
                {snippet.description}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {snippet.isPublic ? (
                <Globe className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Lock className="h-4 w-4 text-muted-foreground" />
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onView(snippet)}>
                    <Eye className="mr-2 h-4 w-4" />
                    View
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleCopy}>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Code
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleShare}>
                    <Share className="mr-2 h-4 w-4" />
                    Share
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-3">
            <Avatar className="h-6 w-6">
              <AvatarImage src={snippet.author?.profileImage} />
              <AvatarFallback>
                {snippet.author?.username?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">
              {snippet.author.username}
            </span>
            <span className="text-xs text-muted-foreground">•</span>
            <span className="text-xs text-muted-foreground">
              {/* {snippet.createdAt?.toISOString()} */}
            </span>
          </div>
        </CardHeader>

        <CardContent
          className="pt-0 flex-grow-1"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onView(snippet);
          }}
        >
          <div className="bg-muted rounded-lg p-3 font-mono text-sm overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <Badge variant="secondary" className="text-xs">
                {snippet.language}
              </Badge>
            </div>
            <SyntaxHighlighter
              language={snippet.language.toLowerCase()}
              style={vscDarkPlus}
              showLineNumbers={false}
              wrapLongLines={true}
              className="w-full max-h-[200px] overflow-y-scroll"
            >
              {snippet.code}
            </SyntaxHighlighter>
          </div>

          {tags?.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{tags.length - 3}
                </Badge>
              )}
            </div>
          )}
        </CardContent>

        <CardFooter className="flex items-center justify-between pt-3">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className={`gap-1 ${isLiked ? "text-red-500" : ""}`}
              onClick={handleVote}
            >
              <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
              {votes}
            </Button>
            <Button variant="ghost" size="sm" className="gap-1">
              <MessageCircle className="h-4 w-4" />
              {snippet.comments}
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={handleShare}>
              <Share className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default SnippetCard;
