import * as React from "react";
import type { SVGProps } from "react";
const SvgDropDown = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 18 10"
    fill="none"
    width="1em"
    height="1em"
    {...props}
    className={props.className}
  >
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m1 1 8 8 8-8" />
  </svg>
);
export default SvgDropDown;
