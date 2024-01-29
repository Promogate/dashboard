"use client";

import { useUser } from "@/application/states/user-store";
import { Badge } from "../ui/badge";
import { MdWorkspacePremium } from "react-icons/md";
import { Button } from "..";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { FiExternalLink } from "react-icons/fi";
import { HiOutlineCheck } from "react-icons/hi";
import { GiChoice } from "react-icons/gi";
import { SlGraph } from "react-icons/sl";
import { HiOutlineLink } from "react-icons/hi2";
import { MdOutlineLocalOffer } from "react-icons/md";
import { useToast } from "../ui/use-toast";
import { useState } from "react";
import { PulseLoader } from "react-spinners";
import axios from "axios";
import { getCookie } from "cookies-next";

export function ContentTopbar() {
  const user = useUser(state => state.user);
  const token = getCookie("promogate.token");
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);

  const onSubscribe = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get<{ url: string }>(`${process.env.NEXT_PUBLIC_APP_URL}/api/stripe/subscribe`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      window.location.href = data.url;
    } catch (error: any) {
      console.log("STRIPE_CLIENT_ERROR", error.message);
      toast({
        title: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-[56px] border-b border-gray-200 border-opacity-75 flex items-center px-4 justify-between">
      <div className="flex gap-x-2 items-center">
        {user?.user_profile?.role === "FREE" ? (
          <>
            <Badge variant={"secondary"}>
              {user?.user_profile?.role}
            </Badge>
            <Dialog>
              <DialogTrigger>
                <Button className="bg-[#5528ff] flex items-center gap-x-1 text-white" size={"sm"}>
                  <AiOutlineThunderbolt />
                  Upgrade
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="flex justify-center gap-x-2 items-center">
                    <h2 className="text-lg font-semibold">Promogate</h2>
                    <Badge className="bg-[#5528ff] flex items-center gap-x-1 text-white">
                      PRO
                    </Badge>
                  </DialogTitle>
                </DialogHeader>
                <div className="w-full grid grid-cols-1 gap-y-4">
                  <div className="flex items-center justify-between p-4 shadow-sm border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-x-2 text-[#5528ff] text-lg">
                      <GiChoice />
                      <span className="text-gray-900">Redirecionador</span>
                    </div>
                    <div>
                      <HiOutlineCheck />
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 shadow-sm border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-x-2 text-[#5528ff] text-lg">
                      <SlGraph />
                      <span className="text-gray-900">Analytics</span>
                    </div>
                    <div>
                      <HiOutlineCheck />
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 shadow-sm border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-x-2 text-[#5528ff] text-lg">
                      <HiOutlineLink />
                      <span className="text-gray-900">Encurtador</span>
                    </div>
                    <div>
                      <HiOutlineCheck />
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 shadow-sm border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-x-2 text-[#5528ff] text-lg">
                      <MdOutlineLocalOffer />
                      <span className="text-gray-900">Produtos ilimitados</span>
                    </div>
                    <div>
                      <HiOutlineCheck />
                    </div>
                  </div>
                </div>
                <Button className="bg-[#5528ff] flex items-center gap-x-1 text-white" size={"lg"} onClick={onSubscribe}>
                  {loading && <PulseLoader size={10} color="#FFFFFF"/>}
                  Assinar Promogate PRO
                </Button>
              </DialogContent>
            </Dialog>
          </>
        ) : (
          <Badge className="bg-[#5528ff] flex items-center gap-x-1 text-white">
            <MdWorkspacePremium />
            PRO
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