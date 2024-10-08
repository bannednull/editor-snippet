import { useFetcherWithReset } from "@/hooks/useUtils";
import { snippetStore } from "@/stores/snippets-store";
import { Save } from "lucide-react";
import React from "react";
import { useParams } from "react-router-dom";
import { useShallow } from "zustand/shallow";
import EditorSettings from "./editor/editor-settings";
import NewTooltip from "./tooltip";
import { Button } from "./ui/button";

export default function SaveSnippet() {
  const { title } = snippetStore(
    useShallow((state) => ({ title: state.title })),
  );

  const params = useParams<{ snippetId: string }>();

  const fetcher = useFetcherWithReset<{ error: string }>();

  const onChange = React.useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      snippetStore.setState({
        title: ev.target.value,
      });
    },
    [],
  );

  const status = fetcher.state === "submitting";

  return (
    <div className="flex items-center border-b p-2">
      <fetcher.Form
        method="post"
        action="/snippet"
        className="flex items-center w-full gap-1"
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

        <EditorSettings />

        <NewTooltip content="Save snippet">
          <Button
            type="submit"
            variant="ghost"
            className="size-auto py-1 px-2 rounded-md flex items-center text-sm ml-auto"
          >
            <Save size={22} strokeWidth={1} /> {status && "⏳"}
          </Button>
        </NewTooltip>
      </fetcher.Form>
    </div>
  );
}
