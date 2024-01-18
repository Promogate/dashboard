import { ReactNode } from "react";
import { useRedirectorContext } from "./redirector-context";
import Link from "next/link";

type RedirectorHeaderProps = {
  children: ReactNode
}

export function RedirectorHeader({ children }: RedirectorHeaderProps) {
  const { redirector } = useRedirectorContext();
  return (
    <div className="w-full flex justify-between align-middle">
      <Link href={`/painel/redirecionador/${redirector.id}`}>
        <h2 className="text-xl font-semibold hover:underline">
          {redirector.title}
        </h2>
      </Link>
      {children}
    </div>
  );
}