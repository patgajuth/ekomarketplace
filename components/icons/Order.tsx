import * as React from "react";
import type { SVGProps } from "react";
const SvgOrder = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 22"
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
      strokeWidth={1.625}
      d="M5.669 9.917V5.583a4.333 4.333 0 0 1 8.666 0v4.334M5.67 6.667h8.666c3.25 0 4.334 4.214 4.334 5.958 0 6.528-1.737 7.583-8.667 7.583s-8.667-1.055-8.667-7.583c0-1.744 1.084-5.958 4.334-5.958"
    />
  </svg>
);
export default SvgOrder;
