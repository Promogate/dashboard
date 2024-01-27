"use client";

import { queryClient } from "@/app/providers";
import { api } from "@/config";
import { truncateString } from "@/main/utils";
import { ColumnDef } from "@tanstack/react-table";
import { FaFacebookF, FaTelegramPlane, FaWhatsapp } from "react-icons/fa";
import { PiCopyLight } from "react-icons/pi";
import { Button, Switch } from "..";
import { ActionsMenu } from "./actions-menu";
import { FacebookShareButton, TelegramShareButton, WhatsappShareButton } from "react-share";
import { copyToClipboard } from "@/utils/copy-to-clipboard";

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
        <p>{truncateString(row.getValue("title"), 56)}</p>
      );
    }
  },
  {
    accessorKey: "share",
    header: "Compartilhar",
    cell: ({ row }) => {
      const url = row.original["destination_link"];
      return (
        <div className="flex gap-2 items-center">
          <FacebookShareButton url={url}>
            <Button size={"sm"} variant={"secondary"}>
              <FaFacebookF />
            </Button>
          </FacebookShareButton>
          <TelegramShareButton url={url}>
            <Button size={"sm"} variant={"secondary"}>
              <FaTelegramPlane />
            </Button>
          </TelegramShareButton>
          <WhatsappShareButton url={url}>
            <Button size={"sm"} variant={"secondary"}>
              <FaWhatsapp />
            </Button>
          </WhatsappShareButton>
          <Button variant={"secondary"} size={"sm"} onClick={() => copyToClipboard(row.original["short_link"])}>
            <PiCopyLight />
          </Button>
        </div>
      );
    }
  },
  {
    accessorKey: "is_on_showcase",
    header: "Vitrine",
    cell: ({ row }) => {
      const handleSetShowcaseProduct = (isOnShowcase: boolean) => {
        api.put(`/resources/offer/${row.original.id}/update/showcase`, {
          is_on_showcase: isOnShowcase
        }).then((response) => {
          const { status } = response;
          if (status === 200) {
            queryClient.refetchQueries(["products", row.original.resources_id]);
          } else {
            return;
          }
        }).catch((error) => {
          console.log(error.response.data.message);
        });
      };

      return (
        <Switch checked={row.getValue("is_on_showcase")} onCheckedChange={() => handleSetShowcaseProduct(!row.getValue("is_on_showcase"))} />
      );
    }
  },
  {
    accessorKey: "is_featured",
    header: "Em destaque",
    cell: ({ row }) => {
      const handleSetIsFeaturedeProduct = (isFeatured: boolean) => {
        api.put(`/resources/offer/${row.original.id}/update/featured`, {
          is_featured: isFeatured
        }).then((response) => {
          const { status } = response;
          if (status === 200) {
            queryClient.refetchQueries(["products", row.original.resources_id]);
          } else {
            return;
          }
        }).catch((error) => {
          console.log(error.response.data.message);
        });
      };

      return (
        <Switch checked={row.getValue("is_featured")} onCheckedChange={() => handleSetIsFeaturedeProduct(!row.getValue("is_featured"))} />
      );
    }
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => {
      return <ActionsMenu row={row} />;
    }
  }
];