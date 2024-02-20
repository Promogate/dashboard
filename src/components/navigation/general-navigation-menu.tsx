import Link from "next/link";
import { MdOutlineCategory, MdOutlineLocalOffer } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";

export function GeneralNavigationMenu() {
  return (
    <div className="w-full border-b border-gray-200 border-opacity-75 p-4 flex flex-col space-y-4">
      <span className="uppercase text-[8px] tracking-widest text-gray-400">Geral</span>
      <ul className="flex flex-col space-y-3 text-sm">
        <li>
          <Link href="/painel" className="flex gap-2 items-center font-medium">
            <RxDashboard />
            Visão geral
          </Link>
        </li>
        <li>
          <Link href="/painel/produtos" className="flex gap-2 items-center font-medium">
            <MdOutlineLocalOffer />
            Produtos
          </Link>
        </li>
        <li>
          <Link href="/painel/categorias" className="flex gap-2 items-center font-medium">
            <MdOutlineCategory />
            Categorias
          </Link>
        </li>
      </ul>
    </div>
  );
}