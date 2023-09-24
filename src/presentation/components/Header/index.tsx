import Link from "next/link";
import React from "react";
import { PiMagnifyingGlassThin } from "react-icons/pi";
import { MobileMenu } from "./MobileMenu";

interface HeaderProps {
  topBar?: React.ReactNode
  storeName: string
}

export function Header({ topBar, storeName }: HeaderProps) {
  return (
    <header>
      {topBar ?? null}
      <div className="h-16 bg-purple-800">
        <nav className="max-w-screen-xl px-4 h-full mx-auto flex relative justify-between items-center gap-x-16">
          <h1 className="text-white text-2xl font-bold">
            {storeName ? storeName : "Promogate"}
          </h1>
          <div className="hidden lg:flex items-center gap-x-8 text-white font-semibold">
            <Link href={"/promocoes-recentes"}>
              Promoções recentes
            </Link>
            <button>
              Lojas
            </button>
            <Link href={"/cashback"}>
              Cashback
            </Link>
            <Link href={"/blog"}>
              Blog
            </Link>
          </div>
          <div className="flex-1 hidden md:block">
            <form>
              <div className="bg-white rounded-full flex px-4 py-2 gap-x-2 items-center">
                <PiMagnifyingGlassThin />
                <input type="text" name="" id="" placeholder={`Encontre aqui na ${storeName ? storeName : "Promogate"}`}
                  className="bg-transparent focus:outline-none placeholder:font-light w-full" />
              </div>
            </form>
          </div>
          <MobileMenu />
        </nav>
      </div>
    </header>
  );
}