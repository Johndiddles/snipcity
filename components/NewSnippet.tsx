"use client";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import CreateSnippetModal from "./CreateSnippetModal";
import { useSession } from "next-auth/react";

const NewSnippet = () => {
  const { data: session } = useSession();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const handleNewSnippet = () => {
    setIsCreateModalOpen(true);
  };

  const handleSnippetCreated = () => {
    setIsCreateModalOpen(false);
  };
  return !!session ? (
    <>
      <Button onClick={handleNewSnippet} className="gap-2">
        <Plus className="h-4 w-4" />

        <span className="inline md:hidden">New</span>
        <span className="hidden md:inline">New Snippet</span>
      </Button>

      <CreateSnippetModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSnippetCreated={handleSnippetCreated}
      />
    </>
  ) : null;
};

export default NewSnippet;
