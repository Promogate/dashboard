import { ReactNode } from "react";
import RedirectorContext from "./redirector-context";
import { Redirector } from "@/domain/@types";

type RedirectorRootProps = {
  children: ReactNode;
  redirector: Redirector
}

export function RedirectorRoot({ children, redirector }: RedirectorRootProps) {
  return (
    <RedirectorContext.Provider value={{ redirector }}>
      <div className="border rounded-lg bg-white p-4">
        {children}
      </div>
    </RedirectorContext.Provider>
  );
};