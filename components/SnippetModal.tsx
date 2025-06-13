import {
  X,
  Heart,
  MessageCircle,
  Share,
  Copy,
  Edit,
  // Trash,
} from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import { Snippet } from "@/types/snippet";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

interface SnippetModalProps {
  snippet: Snippet;
  isOpen: boolean;
  onClose: () => void;
}

const SnippetModal = ({ snippet, isOpen, onClose }: SnippetModalProps) => {
  const tags = snippet?.tags?.split(",") || [];
  const [isLiked, setIsLiked] = useState(false);
  const [votes, setVotes] = useState(snippet?.upvotes || 0);
  const [comment, setComment] = useState("");
  const [comments] = useState([
    {
      id: 1,
      author: "Alice Chen",
      avatar: "/placeholder.svg",
      content: "Great snippet! This will save me a lot of time.",
      createdAt: "2 hours ago",
    },
    {
      id: 2,
      author: "Bob Smith",
      avatar: "/placeholder.svg",
      content: "Thanks for sharing. Could you add error handling?",
      createdAt: "1 day ago",
    },
  ]);

  if (!snippet) return null;

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
      `${window.location.origin}/snippet/${snippet._id}`
    );
    toast.success("Link copied to clipboard!");
  };

  const handleComment = () => {
    if (!comment.trim()) return;
    // Mock comment submission
    toast.success("Comment added!");
    setComment("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex-1">
              <h2 className="text-2xl font-bold">{snippet.title}</h2>
              <p className="text-muted-foreground mt-1">
                {snippet.description}
              </p>
              <div className="flex items-center gap-2 mt-3">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={snippet.author.profileImage} />
                  <AvatarFallback>
                    {snippet.author.username.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-muted-foreground">
                  {snippet.author.username}
                </span>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">
                  {new Date(snippet.createdAt).toISOString()}
                </span>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex flex-1 overflow-hidden">
            {/* Code Section */}
            <div className="flex-1 flex flex-col">
              <div className="flex items-center justify-between p-4 border-b">
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
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Fork
                  </Button>
                </div>
              </div>

              <div className="flex-1 overflow-auto p-4">
                <pre className="bg-muted rounded-lg p-4 font-mono text-sm overflow-auto">
                  {/* <code>{snippet.code}</code> */}
                  <SyntaxHighlighter
                    language={snippet.language.toLowerCase()}
                    style={vscDarkPlus}
                    showLineNumbers={true}
                    wrapLongLines={true}
                    className="w-full"
                  >
                    {snippet.code}
                  </SyntaxHighlighter>
                </pre>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between p-4 border-t">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`gap-2 ${isLiked ? "text-red-500" : ""}`}
                    onClick={handleVote}
                  >
                    <Heart
                      className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`}
                    />
                    {votes} votes
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <MessageCircle className="h-4 w-4" />
                    {comments.length} comments
                  </Button>
                </div>
                <Button variant="ghost" size="sm" onClick={handleShare}>
                  <Share className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            {/* Comments Section */}
            <div className="w-80 border-l flex flex-col">
              <div className="p-4 border-b">
                <h3 className="font-semibold">Comments</h3>
              </div>

              <div className="flex-1 overflow-auto p-4 space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={comment.avatar} />
                        <AvatarFallback>
                          {comment.author.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">
                        {comment.author}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {comment.createdAt}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground pl-8">
                      {comment.content}
                    </p>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t space-y-3">
                <Textarea
                  placeholder="Add a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="min-h-[80px]"
                />
                <Button
                  onClick={handleComment}
                  disabled={!comment.trim()}
                  className="w-full"
                >
                  Post Comment
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SnippetModal;
