import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Snippet } from "@/types/snippet";
import moment from "moment";
import Comments from "./Comments";
import CodeSection from "./CodeSection";
import ProfileAvatar from "./Avatar";

interface SnippetModalProps {
  snippet: Snippet;
  isOpen: boolean;
  onClose: () => void;
}

const SnippetModal = ({ snippet, isOpen, onClose }: SnippetModalProps) => {
  if (!snippet) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <div className="hidden">
        <DialogTitle>{snippet.title}</DialogTitle>
      </div>
      <DialogContent className="w-full max-w-sm xs:max-w-md sm:max-w-xl md:max-w-3xl lg:max-w-5xl max-h-[90vh] p-0 overflow-x-hidden">
        <div className="w-full flex flex-col h-full overflow-x-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex-1">
              <h2 className="text-2xl text-wrap w-[50%] font-bold">
                {snippet.title}
              </h2>
              <p className="text-muted-foreground mt-1">
                {snippet.description}
              </p>
              <div className="flex items-center gap-2 mt-3">
                <ProfileAvatar
                  name={snippet.author.username}
                  image={snippet.author.profileImage}
                />
                <span className="text-sm text-muted-foreground">
                  {snippet.author.username}
                </span>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">
                  {moment(snippet.createdAt).fromNow()}
                </span>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col md:flex-row">
            {/* Code Section */}
            <CodeSection snippet={snippet} />
            {/* Comments Section */}
            <Comments snippet={snippet} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SnippetModal;
