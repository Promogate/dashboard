import { ReactNode } from "react";

type ContentRootProps = { children: ReactNode }

export function ContentRoot({ children }: ContentRootProps) {
  return (
    <div className="w-full">
        {children}
    </div>
  );
}