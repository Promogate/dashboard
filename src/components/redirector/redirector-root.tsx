import { ReactNode } from "react";

type RedirectorRootProps = {
  children: ReactNode;
}

export function RedirectorRoot({ children }: RedirectorRootProps) {
  return (
    <div className="border rounded-lg bg-white p-4">
      {children}
    </div>
  );
};