"use client";

import { api } from "@/config";
import { MeResponse } from "@/domain/@types";
import { OfferDataInput, OfferWithClicks } from "@/domain/models";
import { parseBRLCurrencytoInteger, parseCurrencyWithoutSign } from "@/main/utils";
import { DashboardLayout } from "@/presentation/components";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  GridItem,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useClipboard,
  useDisclosure,
  useToast
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Inter } from "next/font/google";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { Fragment } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { RiFileCopyLine } from "react-icons/ri";
import { TfiAngleLeft } from "react-icons/tfi";

type SingleOfferPageProps = {
  status: string;
  message: string;
  offer: OfferWithClicks
}

type SingleOffersPageProps = MeResponse & { offer: OfferWithClicks }

const inter = Inter({ subsets: ["latin"] });

// export const getServerSideProps = withSSRAuth(async (ctx) => {
//   const cookies = parseCookies(ctx);
//   const { id } = ctx.query as { id: string };

//   const { data } = await api.get<MeResponse>("/users/me", {
//     headers: {
//       Authorization: `Bearer ${cookies["promogate.token"]}`
//     }
//   });

//   const offer = await api.get<SingleOfferPageProps>(`/resources/${data.user.user_profile.resources.id}/offer/${id}`, {
//     headers: {
//       Authorization: `Bearer ${cookies["promogate.token"]}`
//     }
//   });

//   return {
//     props: {
//       status: data.status,
//       user: data.user,
//       offer: offer.data.offer
//     }
//   };
// });

/*eslint-disable react/no-children-prop*/
export default function Page({ status, user, offer }: SingleOffersPageProps) {
  const cookies = parseCookies();
  const toast = useToast();
  const router = useRouter();
  const { id } = router.query as { id: string };
  const deletePopup = useDisclosure();
  const query = useQueryClient();
  const { onCopy, value, setValue, hasCopied } = useClipboard("");

  const { register, handleSubmit, formState: { isSubmitting } } = useForm<OfferDataInput>({
    defaultValues: {
      description: offer.description,
      destinationLink: offer.destination_link,
      image: offer.image,
      oldPrice: parseCurrencyWithoutSign(offer.old_price),
      price: parseCurrencyWithoutSign(offer.price),
      storeName: offer.store_name,
      title: offer.title,
      expirationDate: offer.expiration_date
    },
  });

  const mutation = useMutation(async (data: OfferDataInput) => {
    const old_price = parseBRLCurrencytoInteger(data.oldPrice);
    const price = parseBRLCurrencytoInteger(data.price);
    await api.put(`/resources/${user.user_profile.resources.id}/offer/${id}/update`, {
      ...data,
      old_price,
      price
    }, {
      headers: {
        Authorization: `Bearer ${cookies["promogate.token"]}`
      }
    });
  }, {
    onSuccess: () => {
      query.invalidateQueries(["offers", user.id]);
      toast({
        status: "success",
        description: "Oferta atualizada com sucesso!"
      });
    },
    onError: (e: any) => {
      toast({
        status: "error",
        description: e.message
      });
    }
  });

  const createOffer: SubmitHandler<OfferDataInput> = async (data) => {
    await mutation.mutateAsync(data);
  };

  const deleteMutation = useMutation(async () => {
    await api.delete(`/resources/offer/${id}`, {
      headers: {
        Authorization: `Bearer ${cookies["promogate.token"]}`
      }
    });
  }, {
    onSuccess: () => {
      query.invalidateQueries(["offers", user.id]);
      toast({
        status: "success",
        description: "Oferta excluída com sucesso!"
      });
      router.push("/dashboard/promocoes");
    },
    onError: (e: any) => {
      toast({
        status: "error",
        description: e.message
      });
    }
  });

  const handleDeleteOffer = async () => {
    await deleteMutation.mutateAsync();
  };

  const shortlinkMutation = useMutation(async (): Promise<void> => {
    await api.put(`resources/offer/${id}/shortlink`, {
      headers: {
        Authorization: `Bearer ${cookies["promogate.token"]}`
      }
    });
  }, {
    onSuccess: () => {
      query.invalidateQueries(["offer", id]);
      toast({
        status: "success",
        description: "Shortlink atualizado com sucesso!"
      });
    },
    onError: (e: any) => {
      toast({
        status: "error",
        description: e.message
      });
    }
  });

  return (
    <Fragment>
      <Head>
        <title>Promogate - Editar Promoção</title>
      </Head>
      <DashboardLayout>
        <Flex
          width={["100%"]}
          marginBottom={["2rem"]}
        >
          <Heading
            as={"h2"}
            fontSize={["2rem"]}
            color={"gray.600"}
          >
            Loja - {offer.resources.user_profile.store_name_display}
          </Heading>
        </Flex>
        <Flex
          width={"100%"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <IconButton
            as={Link}
            href='/dashboard/promocoes'
            aria-label='create'
            variant={"outline"}
          >
            <TfiAngleLeft />
          </IconButton>
          <Heading
            as={"h3"}
            fontSize={["2rem"]}
            color={"gray.600"}
          >
            Editar oferta
          </Heading>
        </Flex>
        <Box
          as={"form"}
          onSubmit={handleSubmit(createOffer)}
          margin={["1rem 0"]}
        >
          <Box
            display={"grid"}
            gridTemplateColumns={{ xl: "1fr 1fr" }}
            gap={["1rem"]}
            backgroundColor={"white"}
            padding={["1rem"]}
            borderRadius={{ xl: "1rem" }}
            overflow={"auto"}
          >
            <FormControl>
              <FormLabel>(Link) Imagem da Oferta</FormLabel>
              <Input
                type='text'
                placeholder={offer.image}
                {...register("image")}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Título da Oferta</FormLabel>
              <Input
                type='text'
                placeholder={offer.title}
                {...register("title")}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Preço antigo (Opcional) </FormLabel>
              <InputGroup>
                <InputLeftAddon children='R$' />
                <Input
                  type='text'
                  placeholder={parseCurrencyWithoutSign(offer.old_price)}
                  {...register("oldPrice")}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Preço final</FormLabel>
              <InputGroup>
                <InputLeftAddon children='R$' />
                <Input
                  type='text'
                  placeholder={parseCurrencyWithoutSign(offer.price)}
                  {...register("price")}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Destino (Link Afiliado)</FormLabel>
              <Input
                type='text'
                placeholder={offer.destination_link}
                {...register("destinationLink")}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Nome da loja (Anunciante)</FormLabel>
              <Input
                type='text'
                placeholder={offer.store_name}
                {...register("storeName")}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Shortlink</FormLabel>
              <Flex gap={["0.5rem"]}>
                <Input
                  readOnly
                  value={offer.short_link}
                  type='text'
                />
                <IconButton
                  aria-label='Copiar shortlink'
                  onClick={onCopy}
                  icon={<RiFileCopyLine />}
                />
              </Flex>
            </FormControl>
            <FormControl
              as={GridItem}
              colSpan={[1, 1, 2]}
              position={"relative"}
            >
              <FormLabel>Descrição (Opcional)</FormLabel>
              <Textarea
                {...register("description")}
              />
            </FormControl>
          </Box>
          <Flex
            justifyContent={"space-between"}
            width={"100%"}
            padding={["2rem 0"]}
            alignItems={"center"}
          >
            <Button
              colorScheme={"red"}
              variant={"outline"}
              margin={{ xl: "1rem 0" }}
              size={"sm"}
              onClick={deletePopup.onOpen}
            >
              Deletar Oferta
            </Button>
            <Button
              size={"lg"}
              backgroundColor={"black"}
              _hover={{
                backgroundColor: "black"
              }}
              color={"white"}
              type='submit'
              isLoading={isSubmitting}
            >
              Atualizar oferta
            </Button>
          </Flex>
        </Box>
      </DashboardLayout>

      <Modal
        isOpen={deletePopup.isOpen}
        onClose={deletePopup.onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalBody>
            <Heading
              as={"h3"}
              fontSize={{ xl: "1.275rem" }}
              fontFamily={inter.style.fontFamily}
              fontWeight={"medium"}
            >
              Você tem certeza que deseja excluir a oferta {`: ${offer.title}?` ?? "?"}
            </Heading>
            <Flex width={"100%"} justifyContent={"space-between"}>
              <Button
                colorScheme={"red"}
                margin={{ xl: "1rem 0" }}
                size={"sm"}
                onClick={handleDeleteOffer}
              >
                Deletar Oferta
              </Button>
              <Button
                margin={{ xl: "1rem 0" }}
                size={"sm"}
                onClick={deletePopup.onClose}
                backgroundColor={"black"}
                _hover={{
                  backgroundColor: "black"
                }}
                color={"white"}
              >
                Mudei de ideia. Não quero excluir
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Fragment>
  );
}
