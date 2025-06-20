import { Snippet } from "@/types/snippet";
import { ThumbsUp } from "lucide-react";
import { Button } from "./ui/button";
import { useAuthWithCallback } from "@/hooks/useAuthenticatedAction";

const Upvote = ({
  snippet,
  handleVote,
}: {
  snippet: Snippet;
  handleVote: (voteType: string) => void;
}) => {
  const { withAuth } = useAuthWithCallback();

  const upvote = async () => handleVote("upvote");
  return (
    <Button
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        withAuth(upvote);
      }}
      className="flex items-center gap-1 text-sm text-muted-foreground"
      variant={"ghost"}
    >
      <ThumbsUp
        className={`h-4 w-4 ${
          snippet.userVote === "upvote" ? "text-green-600" : "text-green-500"
        }`}
        fill={`${snippet.userVote === "upvote" ? "currentColor" : undefined}`}
      />
      <span>{snippet.upvotes}</span>
    </Button>
  );
};

export default Upvote;
