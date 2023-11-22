import Link from "next/link";
import { GiChoice } from "react-icons/gi";
import { HiOutlineLink } from "react-icons/hi2";
import { SlGraph } from "react-icons/sl";

export function ToolsNavigationMenu() {
  return (
    <div className="w-full border-b border-gray-200 border-opacity-75 p-4 flex flex-col space-y-4">
      <span className="uppercase text-[8px] tracking-widest text-gray-400">Ferramentas</span>
      <ul className="flex flex-col space-y-5">
        <li>
          <Link href="/painel/encurtador" className="text-sm flex gap-2 items-center font-medium">
            <HiOutlineLink />
            Encurtador
          </Link>
        </li>
        <li>
          <Link href="/painel/redirecionador" className="text-sm flex gap-2 items-center font-medium">
            <GiChoice />
            Redirecionador
          </Link>
        </li>
        <li>
          <Link href="/painel/analytics" className="text-sm flex gap-2 items-center font-medium">
            <SlGraph />
            Analytics
          </Link>
        </li>
      </ul>
    </div>
  );
}