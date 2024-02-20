import Link from "next/link";
import { GoGear, GoQuestion, GoShield } from "react-icons/go";

export function SupportNavigationMenu() {
  return (
    <div className="w-full p-4 flex flex-col space-y-4">
      <span className="uppercase text-[8px] tracking-widest text-gray-400">Suporte</span>
      <ul className="flex flex-col space-y-3 text-sm">
        <li>
          <Link href="/painel/configuracoes" className="flex gap-2 items-center font-medium">
            <GoGear />
            Configurações
          </Link>
        </li>
        <li>
          <Link href="/painel/seguranca" className="flex gap-2 items-center font-medium">
            <GoShield />
            Segurança
          </Link>
        </li>
        <li>
          <Link href="/painel/ajuda" className="flex gap-2 items-center font-medium">
            <GoQuestion />
            Ajuda
          </Link>
        </li>
      </ul>
    </div>
  );
}