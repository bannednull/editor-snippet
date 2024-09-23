import { generateToken } from "@/lib/utils";
import { Plus } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export default function DialogNew() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleNewSnippet = () => {
    setOpen(false);
    const token = generateToken(16);
    navigate(`/new/${token}`);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full" size="sm" variant="secondary">
          <Plus className="mr-2" size={14} /> New Snippet
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Create new snippet?</DialogTitle>
        <DialogDescription>
          The changes will be lost if you do not save them.
        </DialogDescription>
        <DialogFooter className="sm:justify-start">
          <DialogClose>Cancel</DialogClose>
          <Button className="ml-3" onClick={handleNewSnippet}>
            Accept
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
