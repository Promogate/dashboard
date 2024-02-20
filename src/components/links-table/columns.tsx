"use client";

import { truncateString } from "@/main/utils";
import { ColumnDef } from "@tanstack/react-table";
import { PiCopyLight } from "react-icons/pi";
import { Button } from "..";
import { copyToClipboard } from "@/utils/copy-to-clipboard";
import { Input } from "../ui/input";
import Image from "next/image";
import Link from "next/link";
import { PiGearLight } from "react-icons/pi";

export type Product = {
  id: string;
  image: string;
  title: string;
  old_price: string;
  price: string;
  destination_link: string;
  store_image: string | null;
  store_name: string;
  description: string;
  expiration_date: string;
  created_at: string;
  is_on_showcase: boolean;
  is_featured: boolean;
  is_free_shipping: boolean;
  resources_id: string;
  short_link: string;
  categories: [];
};

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "title",
    header: "Nome",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 items-center">
          {row.getValue("image") ? (
            <Image src={row.getValue("image")} alt={row.getValue("title")} width={56} height={56} />
          ) : (
            <Image src="/product-image-fallback.png" alt={row.getValue("title")} width={56} height={56} />
          )}
          <p>{truncateString(row.getValue("title"), 56)}</p>
        </div>
      );
    }
  },
  {
    accessorKey: "share",
    header: "Link encurtado",
    cell: ({ row }) => {
      const url = row.original["destination_link"];
      return (
        <div className="flex gap-2 items-center">
          <Input readOnly value={row.original["short_link"]} />
          <Button variant={"secondary"} size={"sm"} onClick={() => copyToClipboard(row.original["short_link"])}>
            <PiCopyLight />
          </Button>
        </div>
      );
    }
  },
  {
    accessorKey: "is_featured",
    header: "Cliques",
    cell: ({ row }) => {
      return (
        <span>387</span>
      );
    }
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => {
      return (
        <Link href={`/painel/encurtador/link/${row.original.id}`}>
          <Button variant={"secondary"} size={"sm"}>
            <PiGearLight />
          </Button>
        </Link>
      );
    }
  }
];