import * as React from "react";
import type { SVGProps } from "react";
const SvgWarning = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 26 25"
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
      strokeWidth={2}
      d="M13 18.53v.012m0-12.084v8.459M24.25 12.5c0 6.006-5.037 10.875-11.25 10.875S1.75 18.506 1.75 12.5 6.787 1.625 13 1.625 24.25 6.494 24.25 12.5"
    />
  </svg>
);
export default SvgWarning;
