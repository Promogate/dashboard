"use client";

import { loggedUser } from "@/application/atoms";
import { Button, PageHeader, ProductsTable } from "@/components";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useQuery } from "react-query";
import { PulseLoader } from "react-spinners";
import { useRecoilValue } from "recoil";

export default function Page() {
  const user = useRecoilValue(loggedUser);
  const resourcesId = user?.resources_id as string;
  const query = useQuery({ queryKey: ["products", resourcesId], cacheTime: 1000 * 60 * 5, staleTime: 1000 * 60 * 5 });
  const handleProductsTableUpdate = () => {
    query.refetch();
  };

  return (
    <div className="w-full h-full">
      <Dialog>
        <div className="w-full flex justify-between items-center">
          <PageHeader>Produtos</PageHeader>
          <div className="flex items-center gap-4">
            <Button variant={"outline"} className="flex items-center gap-2 trasition-all duration-500 ease-in-out" onClick={handleProductsTableUpdate}>
              {query.isRefetching && <PulseLoader color="#2a2a2a" size={4} />}
              Atualizar produtos
            </Button>
            <DialogTrigger asChild>
              <Button variant={"default"} className="bg-[#5528ff] text-white">
                Adicionar produto
              </Button>
            </DialogTrigger>
          </div>
        </div>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Adicionar um novo produto
            </DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button>
              Adicionar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <ProductsTable />
    </div>
  );
}