"use client";
import { useState } from "react";
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  Share,
  Copy,
  Edit,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import EditSnippetModal from "@/components/EditSnippetModal";
import { comments } from "@/mockData/comments";
import { useQuery } from "@tanstack/react-query";
import { Snippet } from "@/types/snippet";
// import { ISnippet } from "@/db/schema/Snippet";
import Container from "@/components/Container";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { useSession } from "next-auth/react";
import SingleSnippetViewSkeleton from "@/components/SingleSnippetSkeletonLoader";
import moment from "moment";
import { QUERY_KEYS } from "@/constants/queries";
import Comments from "@/components/Comments";

const SnippetView = () => {
  const { id } = useParams();
  const navigate = useRouter();
  const session = useSession();
  const [isLiked, setIsLiked] = useState(false);
  const [votes, setVotes] = useState(0);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { data, isPending } = useQuery({
    queryKey: [QUERY_KEYS.FETCH_SINGLE_SNIPPET, id],
    queryFn: () =>
      fetch(`/api/snippets/${id}`).then((res) => res.json()) as Promise<{
        snippet: Snippet;
      }>,
  });

  console.log({ data, isPending });

  if (isPending) {
    return <SingleSnippetViewSkeleton />;
  }

  if (!data || !data.snippet) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Snippet not found</h2>
          <p className="text-muted-foreground mb-4">
            The snippet you&apos;re looking for doesn&apos;t exist.
          </p>
          <Button onClick={() => navigate.push("/")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const { snippet } = data;
  const tags = snippet.tags?.split(",") || [];

  const handleVote = () => {
    setIsLiked(!isLiked);
    setVotes(isLiked ? votes - 1 : votes + 1);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.code);
    toast.success("Code copied to clipboard!");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  const handleSnippetUpdated = (updatedSnippet: Snippet) => {
    console.log({ updatedSnippet });
    toast.success("Snippet updated successfully!");
  };

  return (
    <Container>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b">
          <div className="py-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate.push("/")}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div className="flex-1">
                <h1 className="text-2xl font-bold">{snippet.title}</h1>
                <p className="text-muted-foreground">{snippet.description}</p>
              </div>

              {session?.data?.user?.id === snippet.author._id && (
                <Button onClick={() => setIsEditModalOpen(true)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="py-6">
          <div className="grid gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={snippet?.author?.profileImage} />
                  <AvatarFallback>
                    {snippet?.author?.username?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{snippet?.author?.username}</p>
                  <p className="text-sm text-muted-foreground">
                    {moment(snippet.createdAt).fromNow()}
                  </p>
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
                <Comments snippet={snippet} />
              </div>
            </div>
          </div>
        </div>

        <EditSnippetModal
          snippet={snippet}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSnippetUpdated={handleSnippetUpdated}
        />
      </div>
    </Container>
  );
};

export default SnippetView;
