import { ReactNode } from "react";

type NavigationRootProps = {
  children: ReactNode;
}

export function NavigationRoot({ children }: NavigationRootProps) {
  return (
    <div className="lg:w-[240px] h-screen sticky top-0 border-r border-gray-200 border-opacity-75 flex flex-col">
      {children}
    </div>
  );
}