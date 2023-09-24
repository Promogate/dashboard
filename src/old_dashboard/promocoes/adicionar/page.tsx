"use client";

import { PromogateContext } from "@/application/contexts";
import { OfferDataInput } from "@/domain/models";
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
  Textarea,
  useToast
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { TfiAngleLeft } from "react-icons/tfi";

/*eslint-disable react/no-children-prop*/
export default function Page({ status, user }: any) {
  const toast = useToast();
  const router = useRouter();
  const query = useQueryClient();

  const { createOffer } = useContext(PromogateContext);

  const { register, handleSubmit, formState: { isSubmitting }, watch } = useForm<OfferDataInput>();

  const mutation = useMutation({
    mutationFn: async (input: OfferDataInput) => await createOffer(input, user.user_profile.resources.id),
    onSuccess: () => {
      query.invalidateQueries(["offers", user.id]);
      toast({
        status: "success",
        description: "Oferta adicionada com sucesso!"
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

  const handleCreateOffer: SubmitHandler<OfferDataInput> = async (data) => {
    await mutation.mutateAsync(data);
  };

  return (
    <Fragment>
      <Head>
        <title>Promogate - Adicionar Nova Promoção</title>
      </Head>
      <DashboardLayout>
        <Flex
          width={"100%"}
          justifyContent={"space-between"}
          alignItems={"center"}
          marginBottom={["1rem"]}
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
            as={"h2"}
            fontSize={{ xl: "2xl" }}
            color={"gray.600"}
          >
            Adicionar oferta
          </Heading>
        </Flex>
        <Box
          as={"form"}
          onSubmit={handleSubmit(handleCreateOffer)}
          height={["max-content"]}
        >
          <Box
            display={"grid"}
            gridTemplateColumns={["1fr", "1fr", "1fr 1fr"]}
            gap={["1rem"]}
            backgroundColor={"white"}
            padding={["2rem"]}
            borderRadius={"1rem"}
            overflow={"auto"}
          >
            <FormControl
              as={GridItem}
            >
              <FormLabel>(Link) Imagem da Oferta</FormLabel>
              <Input
                type='text'
                {...register("image")}
              />
            </FormControl>
            <FormControl
              as={GridItem}
            >
              <FormLabel>Título da Oferta</FormLabel>
              <Input
                type='text'
                {...register("title")}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Preço antigo (Opcional) </FormLabel>
              <InputGroup>
                <InputLeftAddon children='R$' />
                <Input
                  type='text'
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
                  {...register("price")}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Destino (Link Afiliado)</FormLabel>
              <Input
                type='text'
                {...register("destinationLink")}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Nome da loja (Anunciante)</FormLabel>
              <Input
                type='text'
                {...register("storeName")}
              />
            </FormControl>
            <FormControl
              as={GridItem}
              colSpan={[1, 2]}
              position={"relative"}
              height={["240px", "240px"]}
            >
              <FormLabel>Descrição (Opcional)</FormLabel>
              <Textarea
                {...register("description")}
              />
            </FormControl>
          </Box>
          <Flex
            justifyContent={"flex-end"}
            padding={["2rem 0"]}
          >
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
              Adicionar oferta
            </Button>
          </Flex>
        </Box>
      </DashboardLayout>
    </Fragment>
  );
}

// export const getServerSideProps = withSSRAuth(async (ctx) => {
//   const cookies = parseCookies(ctx);

//   const { data } = await api.get<MeResponse>("/users/me", {
//     headers: {
//       Authorization: `Bearer ${cookies["promogate.token"]}`
//     }
//   });

//   return {
//     props: {
//       status: data.status,
//       user: data.user
//     }
//   };
// }); 
