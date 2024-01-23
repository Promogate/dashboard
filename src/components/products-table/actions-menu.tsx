import { Row } from "@tanstack/react-table";
import { Button } from "..";
import { Product } from "./columns";
import { BiEditAlt } from "react-icons/bi";
import Link from "next/link";

type ActionsMenuProps = {
  row: Row<Product>
}

export function ActionsMenu({ row }: ActionsMenuProps) {

  return (
    <div className="flex gap-x-2 justify-end">
      <Link href={`/painel/produtos/${row.original.id}`}>
        <Button size={"sm"}>
        <BiEditAlt />
          Editar
        </Button>
      </Link>
    </div>
  );
};