import { Redirector } from "@/domain/@types";
import RedirectorContext from "../redirector/redirector-context";
import { ReactNode } from "react";

type GroupRootProps = {
  children: ReactNode;
  redirector: Redirector;
}

export function GroupRoot({ children, redirector }: GroupRootProps) {
  return (
    <RedirectorContext.Provider value={{ redirector }}>
      <div className="border rounded-lg bg-white p-4">
        {children}
      </div>
    </RedirectorContext.Provider>
  );
};