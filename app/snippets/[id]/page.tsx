"use client";
import { useEffect, useState } from "react";
import { ArrowLeft, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import EditSnippetModal from "@/components/EditSnippetModal";
import { useQuery } from "@tanstack/react-query";
import { Snippet } from "@/types/snippet";
import Container from "@/components/Container";
import { useSession } from "next-auth/react";
import SingleSnippetViewSkeleton from "@/components/SingleSnippetSkeletonLoader";
import moment from "moment";
import { QUERY_KEYS } from "@/constants/queries";
import Comments from "@/components/Comments";
import CodeSection from "@/components/CodeSection";
import ProfileAvatar from "@/components/Avatar";

const SnippetView = () => {
  const { id } = useParams();
  const navigate = useRouter();
  const session = useSession();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { data, isPending } = useQuery({
    queryKey: [QUERY_KEYS.FETCH_SINGLE_SNIPPET, id],
    queryFn: () =>
      fetch(`/api/snippets/${id}`).then((res) => res.json()) as Promise<{
        snippet: Snippet;
      }>,
  });

  console.log({ data, isPending });

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

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
                <ProfileAvatar
                  name={snippet?.author?.username}
                  image={snippet?.author?.profileImage}
                />
                <div>
                  <p className="font-medium">{snippet?.author?.username}</p>
                  <p className="text-sm text-muted-foreground">
                    {moment(snippet.createdAt).fromNow()}
                  </p>
                </div>
              </div>
              <div className="w-full flex flex-col md:flex-row">
                {/* Code Section */}
                <CodeSection snippet={snippet} />
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
