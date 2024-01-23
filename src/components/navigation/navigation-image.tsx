import Image from "next/image";
import { Button } from "..";
import { TfiAngleLeft } from "react-icons/tfi";

export function NavigationImage() {
  return (
    <div className="w-full h-[56px] border-b border-gray-200 border-opacity-75 flex justify-between items-center px-4">
      <div className="relative w-28 h-5">
        <Image src="/promogate.svg" alt="Logo Promogate" fill />
      </div>
      <Button variant={"outline"} size={"sm"}>
        <TfiAngleLeft />
      </Button>
    </div>
  );
};