import useEditor from "@/hooks/useEditor";
import { createSnippetStore } from "@/stores/snippets";
import type { LanguageName } from "@uiw/codemirror-extensions-langs";
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

  const { languageSupported, capitalizeLangName } = useEditor();

  const lang = createSnippetStore(useShallow((state) => state.lang));

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          className="rounded-none py-0.5 px-1 size-auto hover:bg-none"
          variant="ghost"
          size="sm"
        >
          <Braces className="mr-1" size={14} /> {capitalizeLangName(lang)}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="select language" />
          <CommandList>
            <CommandGroup>
              {languageSupported.map((lang) => (
                <CommandItem
                  key={lang}
                  value={lang}
                  onSelect={(currentValue) => {
                    createSnippetStore.setState({
                      lang: currentValue as LanguageName,
                    });
                    setOpen(false);
                  }}
                >
                  {capitalizeLangName(lang)}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
