import * as React from "react";
import type { SVGProps } from "react";
const SvgCheck = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 18 12"
    fill="none"
    width="1em"
    height="1em"
    {...props}
    className={props.className}
  >
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 1 6 12 1 7" />
  </svg>
);
export default SvgCheck;
