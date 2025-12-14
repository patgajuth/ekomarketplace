import * as React from "react";
import type { SVGProps } from "react";
const SvgDropUp = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 18 10"
    fill="none"
    width="1em"
    height="1em"
    {...props}
    className={props.className}
  >
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9 9 1 1 9" />
  </svg>
);
export default SvgDropUp;
