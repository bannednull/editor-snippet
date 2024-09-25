import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export default function NewTooltip({
  children,
  content,
  side,
  align,
}: {
  children: React.ReactNode;
  content: string;
  side?: "top" | "bottom" | "right" | "left";
  align?: "start" | "center" | "end";
}) {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side} align={align} className="text-xs">
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
