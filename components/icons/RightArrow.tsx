import * as React from "react";
import type { SVGProps } from "react";
const SvgRightArrow = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 18 14"
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
      d="M17 7H1m16 0-6 6m6-6-6-6"
    />
  </svg>
);
export default SvgRightArrow;
