import { type Languages, languages } from "@/lib/editor";
import { createSnippetStore } from "@/stores/snippets-store";
import { Braces } from "lucide-react";
import React from "react";
import { useShallow } from "zustand/shallow";
import { Button } from "./ui/button";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export default function ComboLang() {
  const [open, setOpen] = React.useState(false);

  const lang = createSnippetStore(useShallow((state) => state.lang));

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          className="rounded-none py-0.5 px-1 size-auto hover:bg-none"
          variant="ghost"
          size="sm"
        >
          <Braces className="mr-1" size={14} /> {lang}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="select language" />
          <CommandList>
            <CommandGroup>
              {languages.map((lang) => (
                <CommandItem
                  key={lang}
                  value={lang}
                  onSelect={(currentValue) => {
                    createSnippetStore.setState({
                      lang: currentValue as Languages,
                    });
                    setOpen(false);
                  }}
                >
                  {lang}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
