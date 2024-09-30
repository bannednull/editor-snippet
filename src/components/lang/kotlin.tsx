import type { SVGProps } from "react";

const Kotlin = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 128 128"
    width="1.2em"
    height="1.2em"
    {...props}
  >
    <path
      style={{ fill: "hsl(var(--muted-foreground))" }}
      d="M112.484 112.484H15.516V15.516h96.968L64 64Zm0 0"
    />
  </svg>
);

export default Kotlin;
