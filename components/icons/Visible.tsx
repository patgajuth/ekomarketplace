import * as React from "react";
import type { SVGProps } from "react";
const SvgVisible = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 16"
    fill="none"
    width="1em"
    height="1em"
    {...props}
    className={props.className}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M10 1C6.243 1 3.436 3.44 1.767 5.44a3.96 3.96 0 0 0 0 5.12C3.436 12.56 6.243 15 10 15s6.564-2.44 8.233-4.44a3.96 3.96 0 0 0 0-5.12C16.564 3.44 13.757 1 10 1"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M10 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6"
    />
  </svg>
);
export default SvgVisible;
