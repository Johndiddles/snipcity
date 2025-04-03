import Container from "@/components/Container";
import CreateSnippetForm from "@/components/CreateSnippetForm";
import React from "react";

const CreateSnippetPage = () => {
  return (
    <Container>
      <div className="py-5">
        <CreateSnippetForm />
      </div>
    </Container>
  );
};

export default CreateSnippetPage;
