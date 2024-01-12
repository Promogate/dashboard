"use client";

import { useUser } from "@/application/states/user-store";
import { Button, NoResourcesWarning, PageHeader, ProductsTable } from "@/components";
import { CreateProductForm } from "@/components/forms";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useQuery } from "react-query";
import { PulseLoader } from "react-spinners";

export default function Page() {
  const user = useUser((state) => state.user);
  const resourcesId = user?.user_profile?.resources.id as string;
  const query = useQuery({ queryKey: ["products", resourcesId], cacheTime: 1000 * 60 * 5, staleTime: 1000 * 60 * 5 });
  const handleProductsTableUpdate = () => {
    query.refetch();
  };

  return (
    <NoResourcesWarning>
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
            <CreateProductForm />
          </DialogContent>
        </Dialog>
        <ProductsTable />
      </div>
    </NoResourcesWarning>
  );
}