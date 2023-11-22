import Link from "next/link";
import { MdOutlineCategory, MdOutlineLocalOffer } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";

export function GeneralNavigationMenu() {
  return (
    <div className="w-full border-b border-gray-200 border-opacity-75 p-4 flex flex-col space-y-4">
      <span className="uppercase text-[8px] tracking-widest text-gray-400">Geral</span>
      <ul className="flex flex-col space-y-5">
        <li>
          <Link href="/painel" className="text-sm flex gap-2 items-center font-medium">
            <RxDashboard />
            Painel
          </Link>
        </li>
        <li>
          <Link href="/painel/produtos" className="text-sm flex gap-2 items-center font-medium">
            <MdOutlineLocalOffer />
            Produtos
          </Link>
        </li>
        <li>
          <Link href="/painel/categorias" className="text-sm flex gap-2 items-center font-medium">
            <MdOutlineCategory />
            Categorias
          </Link>
        </li>
      </ul>
    </div>
  );
}