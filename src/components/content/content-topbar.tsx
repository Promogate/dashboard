"use client";

import { useUser } from "@/application/states/user-store";
import { Badge } from "../ui/badge";
import { MdWorkspacePremium } from "react-icons/md";
import { Button } from "..";
import { FiExternalLink } from "react-icons/fi";

export function ContentTopbar() {
  const user = useUser(state => state.user);

  return (
    <div className="w-full h-[56px] border-b border-gray-200 border-opacity-75 flex items-center px-4 justify-between">
      <div>
        {user?.user_profile?.role === "FREE" ? (
          <Badge variant={"secondary"}>
            {user?.user_profile?.role}
          </Badge>
        ) : (
          <Badge className="bg-[#5528ff] flex items-center gap-x-1 text-white">
            <MdWorkspacePremium />
            {user?.user_profile?.role}
          </Badge>
        )}
      </div>
      <div className="flex items-center gap-x-4 text-xs text-gray-500">
        <div className="flex items-center gap-x-1 text-xs text-gray-500">
          <span>Logado como</span>
          <span>{user?.email}</span>
        </div>
        <a href={`https://${user?.user_profile?.store_name}.promogate.app`} target="_blank">
          <Button className="flex items-center gap-x-1" size={"sm"}>
          <FiExternalLink />
            Ver vitrine
          </Button>
        </a>
      </div>
    </div>
  );
}