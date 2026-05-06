import { ComponentPropsWithoutRef, ReactNode } from "react";

type HeadingProps = {
  children: ReactNode;
} & ComponentPropsWithoutRef<"h1">;

function Heading({ children, ...props }: HeadingProps) {
  return (
    <h1 className="heading" {...props}>
      {children}
    </h1>
  );
}

export default Heading;
