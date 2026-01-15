import * as React from "react";
import type { SVGProps } from "react";
const SvgShield = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 18 20"
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
      d="m12 8-4 4-2-2m4.07 8.6c3.793-1.772 6.096-6.736 6.742-11.138.22-1.499-.668-2.89-2.023-3.568l-4-2a4 4 0 0 0-3.578 0l-4 2c-1.355.678-2.243 2.07-2.023 3.568.647 4.402 2.95 9.366 6.743 11.138a2.53 2.53 0 0 0 2.138 0"
    />
  </svg>
);
export default SvgShield;
