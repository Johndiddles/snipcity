import { Snippet } from "@/types/snippet";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

const CodeViewer = ({ snippet }: { snippet: Snippet }) => {
  return (
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
  );
};

export default CodeViewer;
