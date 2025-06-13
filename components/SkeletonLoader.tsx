import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

interface SkeletonLoaderProps {
  count?: number;
  viewMode?: "grid" | "list";
}

const SkeletonLoader = ({
  count = 6,
  viewMode = "grid",
}: SkeletonLoaderProps) => {
  return (
    <div
      className={
        viewMode === "grid"
          ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6"
          : "space-y-4"
      }
    >
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index} className="snippet-card">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1 space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-8 w-8 rounded-md" />
              </div>
            </div>

            <div className="flex items-center gap-2 mt-3">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-16" />
            </div>
          </CardHeader>

          <CardContent className="pt-0">
            <div className="bg-muted rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-5/6" />
                <Skeleton className="h-3 w-4/5" />
                <Skeleton className="h-3 w-3/4" />
              </div>
            </div>

            <div className="flex flex-wrap gap-1 mt-3">
              <Skeleton className="h-5 w-12 rounded-full" />
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-5 w-10 rounded-full" />
            </div>
          </CardContent>

          <CardFooter className="flex items-center justify-between pt-3">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-6" />
              </div>
              <div className="flex items-center gap-1">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-4" />
              </div>
            </div>
            <Skeleton className="h-8 w-8 rounded-md" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default SkeletonLoader;
