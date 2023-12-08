"use client";

import { Button } from "@/components";
import { VscSignOut } from "react-icons/vsc";

export function SignOutButtom() {

  return (
    <Button className="flex items-center gap-2 p-0 justify-end w-full" variant={"ghost"} size={"sm"} onClick={() => {}}>
      <VscSignOut />
      Sair
    </Button>
  );
}