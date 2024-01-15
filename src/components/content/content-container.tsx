import { ReactNode } from "react";

type ContentContainerProps = { children: ReactNode };

export function ContentContainer({ children }: ContentContainerProps) {
  return (
    <div className="w-full min-h-[calc(100vh-56px)] bg-[#fafafa] p-6">
      {children}
    </div>
  );
}