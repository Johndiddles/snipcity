import { Snippet } from "@/types/snippet";
import ProfileAvatar from "./Avatar";
import { Textarea } from "./ui/textarea";
import moment from "moment";
import { Button } from "./ui/button";
import { useAuthWithCallback } from "@/hooks/useAuthenticatedAction";
import { useState } from "react";
import { postComment } from "@/services/comments";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/queries";

const Comments = ({ snippet }: { snippet: Snippet }) => {
  const queryClient = useQueryClient();
  const { withAuth } = useAuthWithCallback();
  const [comment, setComment] = useState("");

  const handleComment = async () => {
    if (!comment.trim()) return;
    try {
      const response = await postComment(comment, snippet._id);
      console.log({ response });
      toast.success("Comment added!");
      setComment("");
      queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.FETCH_SINGLE_SNIPPET, snippet._id],
      });
    } catch (error) {
      console.log({ error });
    }
  };
  return (
    <div className="w-full md:w-80 border-l flex flex-col">
      <div className="p-4 border-b">
        <h3 className="font-semibold">Comments</h3>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-4">
        {snippet.comments.map((comment) => (
          <div key={comment._id} className="space-y-2">
            <div className="flex items-center gap-2">
              <ProfileAvatar
                name={comment.author.username}
                image={comment.author.profileImage}
              />
              <span className="text-sm font-medium">
                {comment.author?.username}
              </span>
              <span className="text-xs text-muted-foreground">
                {moment(comment.createdAt).fromNow()}
              </span>
            </div>
            <p className="text-sm text-muted-foreground pl-8">
              {comment.comment}
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
          onClick={() => withAuth(handleComment)}
          disabled={!comment.trim()}
          className="w-full"
        >
          Post Comment
        </Button>
      </div>
    </div>
  );
};

export default Comments;
