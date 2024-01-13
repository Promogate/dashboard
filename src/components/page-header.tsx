import { ReactNode } from "react";

export function PageHeader({ children }: { children: ReactNode; }) {
  return (
    <h2 className="text-lg font-semibold text-gray-600">
      {children}
    </h2>
  );
}