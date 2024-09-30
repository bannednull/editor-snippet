import { Skeleton } from "@/components/ui/skeleton";

export function CodeLoader() {
  return (
    <div className="flex flex-col flex-wrap gap-4 p-4">
      <div className="flex items-start gap-4 ">
        <Skeleton className="h-4 w-64" />
        <Skeleton className="h-4 w-52" />
      </div>

      <div className="flex items-start gap-4 mx-4">
        <Skeleton className="h-4 w-5/12" />
        <Skeleton className="h-4 w-6/12" />
      </div>

      <div className="flex items-start gap-4 mx-4">
        <Skeleton className="h-4 w-4/12" />
        <Skeleton className="h-4 w-2/12" />
        <Skeleton className="h-4 w-3/12" />
      </div>
      <Skeleton className="h-4 w-14" />
    </div>
  );
}
