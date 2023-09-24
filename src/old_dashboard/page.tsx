"use client";

import { PromogateContext } from "@/application/contexts";
import { ContentLoader, DashboardLayout } from "@/presentation/components";
import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Link,
  Skeleton,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Card, Metric, Text as TremorText } from "@tremor/react";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useContext, useMemo, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

type DashboardPageProps = any

/* eslint-disable @next/next/no-img-element */
export default function Page({ status, user }: DashboardPageProps) {
  const { fetchDashboardData } = useContext(PromogateContext);
  const [ctr, setCtr] = useState<number | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["dashboard-data", user.id],
    queryFn: async () => await fetchDashboardData(user.user_profile.id),
    staleTime: 1000 * 60 * 5
  });

  useMemo(() => {
    if (data) {
      setCtr((100 * data?.analytics._count.destination_clicks) / data?.analytics._count.offer_clicks);
    }
  }, [data]);

  return (
    <Box>
      <Head>
        <title>Dashboard</title>
      </Head>
      <DashboardLayout>
        {
          user.user_profile.id ? (
            <Box
              minHeight={["100vh"]}
            >
              <Heading
                as={"h2"}
                fontSize={["2rem"]}
                marginTop={["1rem"]}
                fontFamily={inter.style.fontFamily}
                color={"gray.600"}
              >
                Dashboard - {user.user_profile.store_name_display}
              </Heading>
              <Grid
                gridTemplateColumns={{ xl: "repeat(4, 1fr)" }}
                margin={["1rem 0"]}
                gap={["1rem"]}
              >
                <Card decoration="top" decorationColor="indigo">
                  <TremorText>
                    Visualizações da loja
                  </TremorText>
                  <Skeleton isLoaded={!isLoading}>
                    <Metric>{data?.analytics._count.offer_clicks}</Metric>
                  </Skeleton>
                </Card>
                <Card decoration="top" decorationColor="amber">
                  <TremorText>
                    Cliques nas ofertas
                  </TremorText>
                  <Skeleton isLoaded={!isLoading}>
                    <Metric>{data?.analytics._count.offer_clicks}</Metric>
                  </Skeleton>
                </Card>
                <Card decoration="top" decorationColor="green">
                  <TremorText>
                    Cliques para lojas
                  </TremorText>
                  <Skeleton isLoaded={!isLoading}>
                    <Metric>{data?.analytics._count.destination_clicks}</Metric>
                  </Skeleton>
                </Card>
                <Card decoration="top" decorationColor="teal">
                  <TremorText>
                    Taxa de Conversão
                  </TremorText>
                  <Skeleton isLoaded={!isLoading}>
                    <Metric>{(ctr?.toFixed(2) && Number(ctr?.toFixed(2))) ? ctr?.toFixed(2) : 0}%</Metric>
                  </Skeleton>
                </Card>
              </Grid>
              <Box
                padding={{ xl: "2rem 0" }}
              >
                <Heading
                  as={"h2"}
                  fontSize={["1.5rem", "1.5rem", "2rem"]}
                  fontFamily={inter.style.fontFamily}
                  color={"gray.600"}
                  marginBottom={["1rem"]}
                >
                  Top 10 produtos mais clicados
                </Heading>
                {
                  isLoading ? (
                    <ContentLoader />
                  ) : (data?.resources.offers.length === 0) ? (
                    <Box
                      margin={"0 auto"}
                      textAlign={"center"}
                      alignItems={"center"}
                      border={"1px"}
                      borderRadius={{ xl: "1rem" }}
                      borderColor={"yellow.200"}
                      backgroundColor={"yellow.50"}
                      padding={["2rem"]}
                    >
                      <Heading
                        as={"h2"}
                        fontSize={["xl"]}
                        fontWeight={"normal"}
                        fontFamily={inter.style.fontFamily}
                        color={"yellow.500"}
                      >
                        Você ainda não tem ofertas cadastradas
                      </Heading>
                      <Button
                        as={Link}
                        href={"/dashboard/promocoes/adicionar"}
                        marginTop={["1.5rem", "1rem"]}
                        colorScheme='orange'
                        _hover={{
                          textDecoration: "none"
                        }}
                      >
                        Adicionar oferta
                      </Button>
                    </Box>
                  ) : (
                    <Box
                      backgroundColor={"white"}
                      padding={{ xl: "1rem 0" }}
                      borderRadius={{ xl: "0.5rem" }}
                    >
                      <Table size={"sm"}>
                        <Thead>
                          <Tr>
                            <Th
                              fontSize={["xx-small", "sm"]}
                            >
                              Imagem do produto
                            </Th>
                            <Th
                              fontSize={["xx-small", "sm"]}
                            >
                              Título do produto
                            </Th>
                            <Th
                              fontSize={["xx-small", "sm"]}
                            >
                              Cliques
                            </Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {data?.resources.offers.map((offer) => {
                            return (
                              <Tr
                                key={offer.id}
                                backgroundColor={"white"}
                              >
                                <Td>
                                  <Link
                                    href={`/dashboard/promocoes/${offer.id}`}
                                  >
                                    <Box
                                      position={"relative"}
                                      width={"64px"}
                                      height={"auto"}
                                    >
                                      <img
                                        src={offer.image}
                                        alt={offer.title}
                                      />
                                    </Box>
                                  </Link>
                                </Td>
                                <Td>
                                  <Link
                                    href={`/dashboard/promocoes/${offer.id}`}
                                  >
                                    <Text
                                      fontStyle={inter.style.fontStyle}
                                      fontWeight={"medium"}
                                      color={"gray.600"}
                                    >
                                      {offer.title}
                                    </Text>
                                  </Link>
                                </Td>
                                <Td>
                                  <Flex
                                    width={"100%"}
                                  >
                                    <Text
                                      fontStyle={inter.style.fontStyle}
                                      fontWeight={"medium"}
                                      color={"gray.600"}
                                    >
                                      {offer._count.offer_clicks ?? ""}
                                    </Text>
                                  </Flex>
                                </Td>
                              </Tr>
                            );
                          })
                          }
                        </Tbody>
                      </Table>
                    </Box>
                  )
                }
              </Box>
            </Box>
          ) : (
            <Heading>
              Precisa criar uma loja
            </Heading>
          )
        }
      </DashboardLayout>
    </Box>
  );
}