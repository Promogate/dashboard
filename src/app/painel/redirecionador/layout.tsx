import { NoResourcesWarning } from "@/components";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode; }) {

  return (
    <NoResourcesWarning>
      <div className="w-full h-full">
        {children}
      </div>
    </NoResourcesWarning>
  );
}