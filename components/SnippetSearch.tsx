"use client";
import { Search } from "lucide-react";
import { useState } from "react";
import { Input } from "./ui/input";

const SnippetSearch = () => {
  const [search, setSearch] = useState<string>("");
  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search snippets..."
        className="pl-10"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default SnippetSearch;
