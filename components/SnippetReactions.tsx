import { Button } from "./ui/button";
import { Snippet } from "@/types/snippet";
import { MessageCircle, Share } from "lucide-react";
import { toast } from "sonner";
import Downvote from "./Downvote";
import Upvote from "./Upvote";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/queries";

const SnippetReactions = ({ snippet }: { snippet: Snippet }) => {
  const queryClient = useQueryClient();

  const { mutate: handleVote } = useMutation({
    mutationFn: async (voteType: string) => {
      return fetch(`/api/snippets/${snippet._id}/votes`, {
        method: "POST",
        body: JSON.stringify({ voteType }),
      }).then((res) => res.json());
    },
    onSuccess: () => {
      toast.success("Vote submitted successfully!");
      queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.FETCH_SINGLE_SNIPPET, snippet._id],
      });
      queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.FETCH_ALL_SNIPPETS],
      });
    },
    onError: (error) => {
      console.log(error);
      toast.error("Failed to submit vote. Please try again.");
    },
  });

  const handleShare = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/snippets/${snippet._id}`
    );
    toast.success("Link copied to clipboard!");
  };
  return (
    <div className="flex items-center justify-between p-4 border-t">
      <div className="flex items-center gap-4">
        <div className="flex items-center">
          <Upvote snippet={snippet} handleVote={handleVote} />
          <Downvote snippet={snippet} handleVote={handleVote} />
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          <MessageCircle className="h-4 w-4" />
          {snippet.comments.length} comments
        </Button>
      </div>
      <Button variant="ghost" size="sm" onClick={handleShare}>
        <Share className="h-4 w-4 mr-2" />
        Share
      </Button>
    </div>
  );
};

export default SnippetReactions;
