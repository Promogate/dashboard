import { ReactNode } from "react";

type ContentContainerProps = { children: ReactNode };

export function ContentContainer({ children }: ContentContainerProps) {
  return (
    <div className="w-full min-h-[calc(100vh-56px)] bg-gray-100 p-6">
      {children}
    </div>
  );
}