import { Dispatch, SetStateAction } from "react";
import { Product } from "../products-table/columns";
import { DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Row } from "@tanstack/react-table";
import { UpdateProductForm } from "../forms/update-product";

type EditProductDialogProducts = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  product: Row<Product>
}

export function UpdateProductDialog({ setOpen, product }: EditProductDialogProducts) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          {`Editar: ${product.original.title}`}
        </DialogTitle>
      </DialogHeader>
      <UpdateProductForm product={product} setOpen={setOpen}/>
    </DialogContent>
  );
}