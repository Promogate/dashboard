"use client";

import { Button, PageHeader } from "@/components";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/config";
import { copyToClipboard } from "@/utils/copy-to-clipboard";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { BiError } from "react-icons/bi";
import { LiaCopySolid } from "react-icons/lia";
import { TfiAngleLeft } from "react-icons/tfi";
import { useQuery, useQueryClient } from "react-query";
import { PulseLoader } from "react-spinners";
import { CreateGroupDialog } from "@/components/dialogs/create-group";
import { Redirector } from "@/domain/@types";
import { Group } from "@/components/group";
import { useUser } from "@/application/states/user-store";
import { Product } from "@/components/products-table/columns";
import { useProductsHook } from "@/hooks/use-products";

export default function Page() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const { useProducts } = useProductsHook();
  const query = useProducts();
  
  const handleProductUpdate = () => {
    query.refetch();
  };

  const productData = useCallback(() => {
    const [product] = query.data?.filter(product => product.id === params.id as string) as [Product];
    setProduct(product);
  }, [params.id, query.data]);

  useEffect(() => {
    productData();
  }, [productData]);

  return (
    <>
      <div className="w-full">
        <div className="flex justify-between item-center">
          <Link href={"/painel/produtos"}>
            <Button>
              <TfiAngleLeft />
            </Button>
          </Link>
          <div className="flex gap-2 align-middle">
            
          </div>
        </div>
        <div className="flex justify-between items-center my-8">
          <PageHeader>{product?.title}</PageHeader>
          <div className="flex items-center gap-4">
            <Button variant={"outline"} className="flex items-center gap-2 trasition-all duration-500 ease-in-out" onClick={handleProductUpdate}>
              {query.isRefetching && <PulseLoader color="#2a2a2a" size={4} />}
              Atualizar produto
            </Button>
          </div>
        </div>
      </div>
    </>
  ); 
}