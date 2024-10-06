import { useFetcherWithReset } from "@/hooks/useUtils";
import { createSnippetStore } from "@/stores/snippets-store";
import { Save } from "lucide-react";
import React from "react";
import { useParams } from "react-router-dom";
import { useShallow } from "zustand/shallow";
import { Button } from "./ui/button";

export default function SaveSnippet() {
  const { title } = createSnippetStore(
    useShallow((state) => ({ title: state.title })),
  );

  const params = useParams<{ snippetId: string }>();

  const fetcher = useFetcherWithReset<{ error: string }>();

  const onChange = React.useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      createSnippetStore.setState({
        title: ev.target.value,
      });
    },
    [],
  );

  const status = fetcher.state === "submitting";

  return (
    <div className="bg-black/40 flex items-center border-b p-2">
      <fetcher.Form
        method="post"
        action="/snippet"
        className="flex items-center w-full gap-3"
      >
        <input type="hidden" name="uuid" value={params.snippetId ?? ""} />
        <input
          name="title"
          type="text"
          className="bg-transparent py-1 px-3 focus:outline-none w-full text-sm text-muted-foreground"
          placeholder="Untitled snippet"
          value={title}
          onChange={onChange}
        />
        <Button
          type="submit"
          variant="ghost"
          className="py-1 px-3 h-auto rounded-md flex items-center text-sm ml-auto"
        >
          <Save className="mr-1" size={16} /> Save {status && "⏳"}
        </Button>
      </fetcher.Form>
    </div>
  );
}
