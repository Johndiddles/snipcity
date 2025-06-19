import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const SingleSnippetViewSkeleton = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="container py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" disabled>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="flex-1">
              <Skeleton className="h-8 w-3/4 mb-2" />
              <Skeleton className="h-5 w-full" />
            </div>
            <Skeleton className="h-10 w-20" />
          </div>
        </div>
      </div>

      <div className="container py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Author Info */}
            <div className="flex items-center gap-3">
              <Skeleton className="h-8 w-8 rounded-full" />
              <div>
                <Skeleton className="h-5 w-24 mb-1" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>

            {/* Tags and Language */}
            <div className="flex items-center gap-2 flex-wrap">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-18" />
              <Skeleton className="h-6 w-14" />
            </div>

            {/* Code Block */}
            <div className="border rounded-lg overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b bg-muted/50">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-8 w-16" />
              </div>
              <div className="p-4 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-24" />
              </div>
              <Skeleton className="h-8 w-16" />
            </div>
          </div>

          {/* Comments Sidebar */}
          <div className="space-y-6">
            <div className="border rounded-lg">
              <div className="p-4 border-b">
                <Skeleton className="h-6 w-20" />
              </div>

              <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
                {Array.from({ length: 2 }).map((_, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-6 w-6 rounded-full" />
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                    <div className="pl-8">
                      <Skeleton className="h-4 w-full mb-1" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t space-y-3">
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleSnippetViewSkeleton;
