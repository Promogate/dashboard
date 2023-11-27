"use client";

import { AuthContext } from "@/application/contexts";
import { Button } from "@/components";
import { useContext } from "react";
import { VscSignOut } from "react-icons/vsc";

export function SignOutButtom() {
  const { signOut } = useContext(AuthContext);

  return (
    <Button className="flex items-center gap-2 p-0 justify-end w-full" variant={"ghost"} size={"sm"} onClick={signOut}>
      <VscSignOut />
      Sair
    </Button>
  );
}