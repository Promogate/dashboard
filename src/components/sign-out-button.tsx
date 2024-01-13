"use client";

import { Button } from "@/components";
import { useAuthentication } from "@/hooks";
import { VscSignOut } from "react-icons/vsc";

export function SignOutButtom() {
  const { signOut } = useAuthentication();

  return (
    <Button className="flex items-center gap-2 p-0 justify-end w-full" variant={"ghost"} size={"sm"} onClick={signOut}>
      <VscSignOut />
      Sair
    </Button>
  );
}