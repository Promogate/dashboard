import { Product } from "../products-table/columns";
import { DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { UpdateProductForm } from "../forms/update-product";

type EditProductDialogProducts = {
  product: Product
}

export function UpdateProductDialog({ product }: EditProductDialogProducts) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          {`Editar: ${product.title}`}
        </DialogTitle>
      </DialogHeader>
      <UpdateProductForm product={product} />
    </DialogContent>
  );
}