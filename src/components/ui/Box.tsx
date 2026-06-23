import { type ReactNode } from "react";

interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

function Box({ children, ...props }: BoxProps) {
  return (
    <div className="px-4 py-4 sm:px-6 lg:px-8" {...props}>
      {children}
    </div>
  );
}

export default Box;
