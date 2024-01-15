import Image from "next/image";
import { Button, GeneralNavigationMenu, SignOutButtom, SupportNavigationMenu, ToolsNavigationMenu } from "..";
import { TfiAngleLeft } from "react-icons/tfi";
import { ReactNode } from "react";

type NavigationRootProps = {
  children: ReactNode;
}

export function NavigationRoot({ children }: NavigationRootProps) {
  return (
    <div className="lg:w-[240px] h-screen sticky top-0 border-r border-gray-200 border-opacity-75 flex flex-col">
      {children}
      <div className="w-full h-12 border-t border-gray-200 border-opacity-75 flex items-center px-4">
        <SignOutButtom />
      </div>
    </div>
  );
}