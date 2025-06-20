"use server";
import Container from "@/components/Container";
import { getSnippets } from "@/db/models/getSnippets";
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

const fetchSnippets = async () => {
  const snippets = await getSnippets();
  return snippets;
};

const DiscoverSnippets = async () => {
  const snippets = await fetchSnippets();
  return (
    <Container>
      <div className="py-5 md:py-8 lg:py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {snippets.map((snippet) => (
          <div
            key={snippet._id?.toString()}
            className="w-full flex flex-col gap-4 p-4 rounded-lg shadow-lg border border-gray-200 bg-white"
          >
            <div>
              <p className="text-2xl font-bold text-gray-800 underline underline-offset-8 mb-8">
                {snippet.title}
              </p>
              <p className="text-base">{snippet.description}</p>
              {/* <p className="text-base">{snippet.code}</p> */}
              <SyntaxHighlighter
                language={snippet.language}
                style={vscDarkPlus}
                showLineNumbers={true}
                wrapLongLines={true}
                className="w-full"
              >
                {snippet.code}
              </SyntaxHighlighter>
              <p>{snippet.language}</p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default DiscoverSnippets;
