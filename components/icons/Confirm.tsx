import * as React from "react";
import type { SVGProps } from "react";
const SvgConfirm = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 26 26"
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
      d="M19.25 9.25 10.5 18l-3.75-3.75M24.25 13c0 6.213-5.037 11.25-11.25 11.25S1.75 19.213 1.75 13 6.787 1.75 13 1.75 24.25 6.787 24.25 13"
    />
  </svg>
);
export default SvgConfirm;
