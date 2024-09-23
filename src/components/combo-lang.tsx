import useEditor from "@/hooks/useEditor";
import { Braces } from "lucide-react";
import React from "react";
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
  const [value, setValue] = React.useState("javascript");

  const { languageSupported } = useEditor();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button className="rounded-none" size="sm" variant="ghost">
          <Braces className="mr-1" size={14} /> {value}
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
                    setValue(currentValue);
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
