import { Snippet } from "@/types/snippet";
import { ThumbsDown } from "lucide-react";
import { Button } from "./ui/button";
import { useAuthWithCallback } from "@/hooks/useAuthenticatedAction";

const Downvote = ({
  snippet,
  handleVote,
}: {
  snippet: Snippet;
  handleVote: (voteType: string) => void;
}) => {
  const { withAuth } = useAuthWithCallback();

  const upvote = async () => handleVote("downvote");
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
      <ThumbsDown
        className={`h-4 w-4 ${
          snippet.userVote === "downvote" ? "text-red-600" : "text-red-500"
        }`}
        fill={`${
          snippet.userVote === "downvote" ? "currentColor" : "#00000000"
        }`}
      />
      <span>{snippet.downvotes}</span>
    </Button>
  );
};

export default Downvote;
