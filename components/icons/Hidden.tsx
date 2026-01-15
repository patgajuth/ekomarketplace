import * as React from "react";
import type { SVGProps } from "react";
const SvgHidden = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 22 20"
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
      d="M19 12.834C20.308 11.332 21 10 21 10s-3.636-7-10-7a8.6 8.6 0 0 0-2 .236M11 7a2.995 2.995 0 0 1 3 3M2 1l18 18m-9-6a3 3 0 0 1-2.959-2.5M3.147 7c-.308.345-.585.682-.828 1C1.453 9.128 1 10 1 10s3.636 7 10 7q.512 0 1-.058"
    />
  </svg>
);
export default SvgHidden;
