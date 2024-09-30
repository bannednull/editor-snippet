import type { Snippet } from "@/api/snippet";
import iconLang from "@/components/lang";
import React from "react";
import { Link, useFetcher } from "react-router-dom";
import { Skeleton } from "./ui/skeleton";

export const ListSnippet = () => {
  const [hasLoaded, setHasLoaded] = React.useState(false);

  const fetcher = useFetcher<Snippet[] | { error: string }>({
    key: "snippets",
  });

  React.useEffect(() => {
    if (fetcher.state === "idle" && !fetcher.data) {
      fetcher.load("/snippet");
    } else if (fetcher.data) {
      setHasLoaded(true);
    }
  }, [fetcher]);

  if (fetcher.data && "error" in fetcher.data) {
    return null;
  }

  return (
    <ul className="flex flex-col gap-0.5 mt-5">
      {fetcher.state === "loading" &&
        !hasLoaded &&
        Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="w-full h-6 bg-background my-1" />
        ))}

      {fetcher.data?.map((snippet) => {
        const IconComponent = iconLang[snippet.lang] || null;
        return (
          <li key={snippet.id}>
            <Link
              to={`/${snippet.uuid}`}
              className="p-2 flex items-start gap-2 hover:bg-background rounded-md text-muted-foreground leading-none"
            >
              {IconComponent && <IconComponent />}
              <span className="leading-tight">{snippet.title}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
