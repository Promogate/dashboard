"use client";

import { PromogateContext } from "@/application/contexts";
import { promogateApi } from "@/config";
import { MeResponse, OffersResponse, SocialSoulOfferDataInput } from "@/domain/@types";
import { parseCurrency } from "@/main/utils";
import { DashboardLayout, PageLoader, Pagination } from "@/presentation/components";
import { Alert, AlertIcon, Box, Button, Flex, Grid, GridItem, HStack, Heading, IconButton, Image, Skeleton, Text, Tooltip, useToast } from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { BsCloudDownload } from "react-icons/bs";
import { FiArrowLeft } from "react-icons/fi";
import { RxExternalLink } from "react-icons/rx";

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

interface PageProps {
  params: MeResponse
}

export default function SingleSocialSoulStore({ params }: PageProps) {
  const router = useRouter();
  const { store_id } = router.query as { store_id: string };
  const [page, setPage] = useState(1);
  const [offerData, supplyOfferData] = useState<SocialSoulOfferDataInput>({
    image: "",
    title: "",
    price: 0,
    old_price: 0,
    destination_link: "",
    store_name: "",
    store_image: "",
    description: "",
  });
  
  const toast = useToast();

  const { authorization, createOfferFromSocialSoul } = useContext(PromogateContext);

  const { data, isLoading, refetch } = useQuery({
    queryKey: [params.user.user_profile.user_id, store_id, page],
    queryFn: fetchStoreOffers,
    staleTime: 1000 * 60 * 60 * 12,
    cacheTime: 1000 * 60 * 60 * 12,
  });

  async function fetchStoreOffers() {
    const { data } = await promogateApi.get<OffersResponse>(`/social-soul/offers/store/${store_id}`, {
      headers: {
        Authorization: authorization,
        "x-source-id": params.user.user_profile.lomadee_source_id
      },
      params: {
        size: 25,
        page: page
      }
    });
    return data;
  }

  const createOfferMutation = useMutation({
    mutationFn: async () => await createOfferFromSocialSoul(offerData, params.user.user_profile.resources.id),
    onSuccess: () => {
      toast({
        status: "success",
        description: "Oferta importada com sucesso!"
      });
    },
    onError: () => {
      toast({
        status: "error",
        description: "Houve algum erro"
      });
    }
  });

  async function triggerMutation() {
    await createOfferMutation.mutateAsync();
  }
  
  return (
    <>
      <Head>
        <title>Promogate - Integrações</title>
      </Head>
      <DashboardLayout>
        <Button
          aria-label='Voltar Página'
          onClick={() => router.back()}
          leftIcon={<FiArrowLeft />}
          marginBottom={["1rem"]}
          variant={["outline"]}
        >
          Voltar
        </Button>
        <Skeleton isLoaded={!isLoading}>
          <Heading
            marginBottom={["1rem"]}
          >
            {data?.pagination.totalSize} Ofertas Disponíveis - {data?.offers[0].store.name}
          </Heading>
        </Skeleton>
        <Alert
          status='warning'
          marginBottom={["2rem"]}
        >
          <AlertIcon />
          Estamos trabalhando para finalizar a integração com a SocialSoul
        </Alert>
        <Box
          margin={["2rem 0"]}
        >
          {
            isLoading ?
              (
                <PageLoader />
              ) :
              (
                <>
                  <Box
                    marginBottom={["1rem"]}
                  >
                    <Pagination
                      totalCountOfRegisters={data?.pagination.totalSize!}
                      registersPerPage={25}
                      currentPage={page}
                      onPageChange={setPage}
                    />
                  </Box>
                  <Grid
                    gridTemplateColumns={["1fr", "1fr", "repeat(3, 1fr)", "repeat(4, 1fr)"]}
                    width={["100%"]}
                    gap={["1rem"]}
                  >
                    {data?.offers.map((offer, index) => {
                      return (
                        <GridItem
                          key={index}
                          backgroundColor={["white"]}
                          display={["flex"]}
                          flexDir={["column"]}
                          alignItems={["center"]}
                          justifyContent={["space-between"]}
                          borderRadius={["lg"]}
                          padding={["1rem"]}
                        >
                          <Image
                            src={offer.thumbnail}
                            alt={offer.name}
                            width={["80px"]}
                            paddingBottom={["1rem"]}
                          />
                          <Heading
                            as='h2'
                            fontSize={["1rem"]}
                            fontWeight={["semibold"]}
                            textAlign={["center"]}
                          >
                            {offer.name}
                          </Heading>
                          { }
                          <Flex
                            width={["100%"]}
                            justify={["space-between"]}
                            margin={["1rem 0"]}
                          >
                            <Box>
                              <Text
                                fontSize={["0.8rem"]}
                                color={["gray.400"]}
                              >
                                Preço original
                              </Text>
                              <Text
                                fontSize={["0.8rem"]}
                              >
                                {offer.priceFrom ? parseCurrency(offer.priceFrom) : "Não informado"}
                              </Text>
                            </Box>
                            <Box>
                              <Text
                                fontSize={["0.8rem"]}
                                color={["gray.400"]}
                              >
                                Preço atual
                              </Text>
                              <Text
                                fontSize={["0.8rem"]}
                              >
                                {parseCurrency(offer.price)}
                              </Text>
                            </Box>
                          </Flex>
                          <HStack>
                            <Tooltip
                              label='Ver oferta'
                            >
                              <IconButton
                                aria-label='Link da oferta'
                                target='_blank'
                                as={Link}
                                href={offer.link}
                                icon={<RxExternalLink />}
                                size={"sm"}
                              />
                            </Tooltip>
                            <Button
                              leftIcon={<BsCloudDownload />}
                              size={"sm"}
                              onMouseOver={() => supplyOfferData({
                                title: offer.name,
                                description: "",
                                image: offer.thumbnail,
                                store_name: offer.store.name,
                                store_image: offer.store.thumbnail,
                                destination_link: offer.link,
                                old_price: offer.priceFrom ? offer.priceFrom : 0,
                                price: offer.price
                              })}
                              onClick={triggerMutation}
                              isLoading={createOfferMutation.isLoading}
                            >
                              Importar para Loja
                            </Button>
                          </HStack>
                        </GridItem>
                      );
                    })}
                  </Grid>
                  <Box
                    marginTop={["1rem"]}
                  >
                    <Pagination
                      totalCountOfRegisters={data?.pagination.totalSize!}
                      registersPerPage={25}
                      currentPage={page}
                      onPageChange={setPage}
                    />
                  </Box>
                </>
              )
          }
        </Box>
      </DashboardLayout>
    </>
  );
}
