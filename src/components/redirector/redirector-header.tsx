import { ReactNode } from "react";
import { useRedirectorContext } from "./redirector-context";

type RedirectorHeaderProps = {
  children: ReactNode
}

export function RedirectorHeader({ children }: RedirectorHeaderProps) {
  const { redirector } = useRedirectorContext();
  return (
    <div className="w-full flex justify-between align-middle">
      <h2 className="text-xl font-semibold">
        {redirector.title}
      </h2>
      {children}
    </div>
  );
}