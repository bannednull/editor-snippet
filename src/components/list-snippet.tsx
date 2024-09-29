import type { Snippet } from "@/api/snippet";
import React from "react";
import { Link, useFetcher } from "react-router-dom";
import { Skeleton } from "./ui/skeleton";

export const ListSnippet = () => {
  const fetcher = useFetcher<Snippet[]>({ key: "snippets" });
  const [hasLoaded, setHasLoaded] = React.useState(false);

  React.useEffect(() => {
    if (fetcher.state === "idle" && !fetcher.data) {
      fetcher.load("/snippet");
    } else if (fetcher.data) {
      setHasLoaded(true);
    }
  }, [fetcher]);

  return (
    <ul className="flex flex-col gap-0.5 mt-5">
      {fetcher.state === "loading" &&
        !hasLoaded &&
        Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="w-full h-6 bg-background my-1" />
        ))}

      {fetcher.data?.map((snippet) => (
        <li key={snippet.id}>
          <Link
            to={`/${snippet.uuid}`}
            className="p-2 block hover:bg-background rounded-md"
          >
            {snippet.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};
