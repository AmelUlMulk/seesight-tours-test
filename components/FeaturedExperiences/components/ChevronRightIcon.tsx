import * as React from "react";

function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
      style={{ marginBottom: 1 }}
    >
      <path d="M10.707 17.707L16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z" />
    </svg>
  );
}

export default ChevronRightIcon;
