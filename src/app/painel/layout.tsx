import { Button, GeneralNavigationMenu, SignOutButtom, SupportNavigationMenu, ToolsNavigationMenu } from "@/components";
import Image from "next/image";
import { ReactNode } from "react";
import { TfiAngleLeft } from "react-icons/tfi";


export default function Layout({ children }: { children: ReactNode; }) {
  return (
    <div className="flex">
      <div className="lg:w-[240px] h-screen sticky top-0 border-r border-gray-200 border-opacity-75 flex flex-col">
        <div className="w-full h-[56px] border-b border-gray-200 border-opacity-75 flex justify-between items-center px-4">
          <div className="relative w-28 h-5">
            <Image src="/promogate.svg" alt="Logo Promogate" fill />
          </div>
          <Button variant={"outline"} size={"sm"}>
            <TfiAngleLeft />
          </Button>
        </div>
        <div className="flex-1">
          <GeneralNavigationMenu />
          <ToolsNavigationMenu />
          <SupportNavigationMenu />
        </div>
        <div className="w-full h-12 border-t border-gray-200 border-opacity-75 flex items-center px-4">
          <SignOutButtom />
        </div>
      </div>
      <div className="w-full">
        <div className="w-full h-[56px] border-b border-gray-200 border-opacity-75 flex items-center px-4 justify-end">
          TopBar Menu
        </div>
        <div className="w-full min-h-[calc(100vh-56px)] bg-[#fafafa] p-6">
          {children}
        </div>
      </div>
    </div>
  );
};