import { useFetcherWithReset } from "@/hooks/useUtils";
import { createSnippetStore } from "@/stores/snippets";
import React from "react";

export default function SaveSnippet() {
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
    <fetcher.Form method="post" action="/snippet" className="space-x-1">
      <input
        name="title"
        type="text"
        className="bg-transparent py-1 px-3 border rounded-md w-[270px]"
        placeholder="describe your snippet..."
        onChange={onChange}
      />
      <button
        type="submit"
        className="bg-blue-700 text-white py-1 px-3 rounded-md"
      >
        Save {status && "⏳"}
      </button>
    </fetcher.Form>
  );
}
