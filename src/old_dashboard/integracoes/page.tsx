"use client";

import { DashboardLayout } from "@/presentation/components";
import { Alert, AlertIcon, Box, Button, Flex, Grid, GridItem, Heading } from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { RiSettings3Line } from "react-icons/ri";

const INTEGRATION_LINKS = [
  {
    destination: "/dashboard/integracoes/socialsoul",
    name: "Configurações",
    image: "/logo_social-soul.webp"
  }
];

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

export default function Page() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Promogate - Integrações</title>
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
            Integrações
          </Heading>
        </Flex>
        <Alert
          status='warning'
          marginBottom={["2rem"]}
        >
          <AlertIcon />
          Estamos trabalhando para finalizar a integração com a SocialSoul
        </Alert>
        <Grid
          gridTemplateColumns={["1fr", "1fr", "repeat(3, 1fr)", "repeat(4, 1fr)"]}
        >
          {
            INTEGRATION_LINKS.map((item, i) => {
              return (
                <GridItem
                  key={i}
                  width={["100%"]}
                  backgroundColor={["white"]}
                  padding={["1rem"]}
                  borderRadius={["md"]}
                >
                  <Box
                    position={["relative"]}
                    width={"160px"}
                    height={"56px"}
                    margin={["0 auto"]}
                  >
                    <Image
                      src={item.image}
                      alt='Logo SocialSoul'
                      fill
                    />
                  </Box>
                  <Button
                    leftIcon={<RiSettings3Line />}
                    width={["100%"]}
                    marginTop={["2rem"]}
                    onClick={() => router.push(item.destination)}
                  >
                    {item.name}
                  </Button>
                </GridItem>
              );
            })
          }
        </Grid>
      </DashboardLayout>
    </>
  );
}