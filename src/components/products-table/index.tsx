"use client";

import { useProductsHook } from "@/hooks/use-products";
import { BiError } from "react-icons/bi";
import { PulseLoader } from "react-spinners";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Offer } from "@/domain/@types";

export function ProductsTable() {
  const { useProducts } = useProductsHook();
  const { isLoading, data, isError } = useProducts();

  if (isLoading) {
    return (
      <div className="mx-auto py-10 my-10 h-32 rounded-md border bg-white flex justify-center items-center">
        <PulseLoader color="#2a2a2a" size={16} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto py-10 my-10 h-32 rounded-md border bg-white flex flex-col justify-center items-center">
        <BiError size={32} />
        <h2>Houve algum erro ao tentar encontrar as promoções cadastradas</h2>
      </div>
    );
  }

  if (data?.length === 0) {
    return (
      <div className="py-10 my-10 h-32 rounded-md border bg-white flex justify-center items-center">
        <BiError size={32} />
        <h2>Você ainda não possui produtos cadastrados</h2>
      </div>
    );
  }

  return (
    <div className="mx-auto py-10">
      <DataTable columns={columns} data={data as Offer[]} />
    </div>
  );
}