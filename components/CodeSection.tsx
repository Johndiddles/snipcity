import { Snippet } from "@/types/snippet";
import CodeActions from "./CodeActions";
import CodeViewer from "./CodeViewer";
import SnippetReactions from "./SnippetReactions";

const CodeSection = ({ snippet }: { snippet: Snippet }) => {
  return (
    <div className="min-w-0 w-full max-w-full flex-1 flex flex-col">
      <CodeActions snippet={snippet} />
      <CodeViewer snippet={snippet} />
      <SnippetReactions snippet={snippet} />
    </div>
  );
};
export default CodeSection;
