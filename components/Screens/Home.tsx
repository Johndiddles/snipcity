"use client";
import { useState, useEffect } from "react";
import SnippetCard from "@/components/SnippetCard";
import SnippetModal from "@/components/SnippetModal";
import FilterSidebar from "@/components/FilterSidebar";
import { Button } from "@/components/ui/button";
import { Grid, List, Filter } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Container from "../Container";
import { Snippet } from "@/types/snippet";
import { useQuery } from "@tanstack/react-query";
import SkeletonLoader from "../SkeletonLoader";
import { QUERY_KEYS } from "@/constants/queries";

const HomePage = () => {
  const [selectedSnippet, setSelectedSnippet] = useState<Snippet | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [filters, setFilters] = useState<{
    languages: string[];
    visibility: string;
    sortBy: string;
  }>({
    languages: [],
    visibility: "all",
    sortBy: "newest",
  });

  const { isPending, data: snippets = [] } = useQuery({
    queryKey: [QUERY_KEYS.FETCH_ALL_SNIPPETS],
    queryFn: () =>
      fetch("/api/snippets").then((res) => res.json()) as Promise<Snippet[]>,
  });

  console.log({ isPending, data: snippets });

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const handleViewSnippet = (snippet: Snippet) => {
    setSelectedSnippet(snippet);
    setIsModalOpen(true);
  };

  const filteredSnippets = (snippets || [])?.filter((snippet) => {
    const matchesLanguages =
      filters.languages.length === 0 ||
      filters.languages.includes(snippet.language);

    const matchesVisibility =
      filters.visibility === "all" ||
      (filters.visibility === "public" && !snippet.isPublic) ||
      (filters.visibility === "private" && snippet.isPublic);

    return matchesLanguages && matchesVisibility;
  });

  return (
    <div className="min-h-screen">
      <Container>
        <div className="py-4 md:py-8">
          <div className="flex gap-4 md:gap-8">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block">
              <FilterSidebar filters={filters} onFiltersChange={setFilters} />
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 md:mb-6 gap-4">
                <div>
                  <p className="text-muted-foreground text-sm md:text-base">
                    {filteredSnippets.length} snippet
                    {filteredSnippets.length !== 1 ? "s" : ""} found
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {/* Mobile Filter Button */}
                  <Sheet
                    open={isMobileFilterOpen}
                    onOpenChange={setIsMobileFilterOpen}
                  >
                    <SheetTrigger asChild>
                      <Button variant="outline" size="sm" className="lg:hidden">
                        <Filter className="h-4 w-4 mr-2" />
                        Filters
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-72 p-0">
                      <div className="p-4">
                        <h3 className="font-semibold mb-4">Filters</h3>
                        <FilterSidebar
                          filters={filters}
                          onFiltersChange={(newFilters) => {
                            setFilters(newFilters);
                            setIsMobileFilterOpen(false);
                          }}
                        />
                      </div>
                    </SheetContent>
                  </Sheet>

                  {/* View Mode Toggle */}
                  <div className="flex items-center gap-1">
                    <Button
                      variant={viewMode === "grid" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className="h-8 w-8 p-0"
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className="h-8 w-8 p-0"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Snippets Grid/List */}
              {isPending ? (
                <SkeletonLoader count={6} viewMode={viewMode} />
              ) : (
                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6"
                      : "space-y-4"
                  }
                >
                  {filteredSnippets.map((snippet) => (
                    <SnippetCard
                      key={snippet._id}
                      snippet={snippet}
                      onView={handleViewSnippet}
                    />
                  ))}
                </div>
              )}

              {!isPending && filteredSnippets.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-muted-foreground">
                    <p className="text-lg mb-2">No snippets found</p>
                    <p>Try adjusting your search or filters</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>

      <SnippetModal
        snippet={selectedSnippet!}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default HomePage;
