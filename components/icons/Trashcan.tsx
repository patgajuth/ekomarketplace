import * as React from "react";
import type { SVGProps } from "react";
const SvgTrashcan = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 18 19"
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
      d="M7 8v6m4-6v6m4-10v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4M1 4h16m-5 0V3a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v1"
    />
  </svg>
);
export default SvgTrashcan;
