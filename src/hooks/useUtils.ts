import React from "react";
import { type FetcherWithComponents, useFetcher } from "react-router-dom";

// gracias a: https://github.com/remix-run/remix/discussions/2749#discussioncomment-7276763

export type FetcherWithComponentsReset<T> = FetcherWithComponents<T> & {
  reset: () => void;
};

export function useFetcherWithReset<T>(): FetcherWithComponentsReset<T> {
  const fetcher = useFetcher<T>();

  const [data, setData] = React.useState(fetcher.data);

  React.useEffect(() => {
    if (fetcher.state === "idle") {
      setData(fetcher.data);
    }
  }, [fetcher.state, fetcher.data]);

  return {
    ...fetcher,
    data: data as T,
    reset: () => setData(undefined),
  };
}
