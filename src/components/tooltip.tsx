import type { ReactNode } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export default function NewTooltip({
  children,
  ...props
}: {
  children: ReactNode;
  content: string;
  side?: "top" | "bottom" | "right" | "left";
  align?: "start" | "center" | "end";
}) {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          side={props.side}
          align={props.align}
          className="text-xs"
        >
          {props.content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
