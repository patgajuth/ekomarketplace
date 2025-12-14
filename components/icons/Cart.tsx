import * as React from "react";
import type { SVGProps } from "react";
const SvgCart = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox=" 0 0 20 20"
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
      d="M3.786 3h13.44a2 2 0 0 1 1.896 2.632l-1.666 5A2 2 0 0 1 15.559 12H5.07M3.786 3l-.04-.283A2 2 0 0 0 1.765 1H1m2.786 2 1.285 9m0 0 .184 1.283A2 2 0 0 0 7.235 15H16m0 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-6 2a2 2 0 1 1-4 0 2 2 0 0 1 4 0"
    />
  </svg>
);
export default SvgCart;
