import {
  Heart,
  MessageCircle,
  Share,
  Copy,
  // Edit,
  // Trash,
} from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
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
import { comments } from "@/mockData/comments";
import moment from "moment";

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

  const handleComment = () => {
    if (!comment.trim()) return;
    // Mock comment submission
    toast.success("Comment added!");
    setComment("");
  };

  if (!snippet) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <div className="hidden">
        <DialogTitle>{snippet.title}</DialogTitle>
      </div>
      <DialogContent className="w-full max-w-sm xs:max-w-md sm:max-w-xl md:max-w-3xl lg:max-w-5xl max-h-[90vh] p-0 overflow-x-hidden">
        <div className="w-full flex flex-col h-full overflow-x-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex-1">
              <h2 className="text-2xl text-wrap w-[50%] font-bold">
                {snippet.title}
              </h2>
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
                  {moment(snippet.createdAt).fromNow()}
                </span>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col md:flex-row">
            {/* Code Section */}
            <div className="min-w-0 w-full max-w-full flex-1 flex flex-col">
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

              <div className="w-full">
                <SyntaxHighlighter
                  language={snippet.language.toLowerCase()}
                  style={vscDarkPlus}
                  showLineNumbers={true}
                  wrapLines={true}
                  wrapLongLines={true}
                  className="w-full max-h-[320px] sm:max-h-[480px] lg:max-h-[640px]"
                >
                  {snippet.code}
                </SyntaxHighlighter>
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
            <div className="w-full md:w-80 border-l flex flex-col">
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
