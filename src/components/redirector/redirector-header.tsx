import { Redirector } from "@/domain/@types";
import { RedirectorActions } from "./redirector-actions";
import { ReactNode } from "react";

type RedirectorHeaderProps = {
  redirector: Redirector,
  children: ReactNode
}

export function RedirectorHeader({ redirector, children }: RedirectorHeaderProps) {
  return (
    <div className="w-full flex justify-between align-middle">
      <h2 className="text-xl font-semibold">
        {redirector.title}
      </h2>
      {children}
    </div>
  );
}