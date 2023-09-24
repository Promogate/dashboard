import Link from "next/link";
import { BiRightArrowAlt } from "react-icons/bi";

export function TopBar() {
  return (
    <div className="h-10 bg-purple-900 text-white">
      <div className="max-w-screen-xl mx-auto flex justify-center items-center h-full">
        <p className="text-sm font-medium md:text-base">
          Promoções incríveis <Link href="/pre-black-friday" className="underline">Pré-Black Friday</Link>
        </p>
        <BiRightArrowAlt />
      </div>
    </div>
  );
}