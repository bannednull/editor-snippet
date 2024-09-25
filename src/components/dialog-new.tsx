import { generateToken } from "@/lib/utils";
import { useSnippetStore } from "@/stores/snippets";
import { Plus } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import NewTooltip from "./tooltip";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "./ui/dialog";

export default function DialogNew() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const { code, setCode } = useSnippetStore((state) => state);

  const handleNewSnippet = () => {
    setOpen(false);
    setCode("");
    const token = generateToken(16);
    navigate(`/new/${token}`);
  };

  const NewSnippetButton = () => (
    <NewTooltip content="Create new snippet" side="bottom" align="start">
      <Button
        className="size-7 ml-auto"
        size="icon"
        variant="secondary"
        onClick={() => (code ? setOpen(true) : handleNewSnippet())}
      >
        <Plus size={14} />
      </Button>
    </NewTooltip>
  );

  return (
    <>
      <NewSnippetButton />
      {code && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogTitle>Create new snippet?</DialogTitle>
            <DialogDescription>
              The changes will be lost if you do not save them.
            </DialogDescription>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button variant="secondary">Cancel</Button>
              </DialogClose>
              <Button className="ml-3" onClick={handleNewSnippet}>
                Accept
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
