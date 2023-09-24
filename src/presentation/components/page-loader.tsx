import { Box, Grid, Spinner } from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";

export function PageLoader() {
  return (
    <>
      <Head>
        <title>Promogate</title>
      </Head>
      <Grid
        height={["100vh"]}
        placeItems={["center"]}
        justifyContent={["center"]}
      >
        <Grid
          justifyContent={["center"]}
        >
          <Spinner 
            margin={["1rem auto"]}
          />
          <Box
            height={"30px"}
            width={"160px"}
            position={["relative"]}
          >
            <Image
              src={"/promogate-logo.svg"}
              alt='Carregando página'
              fill
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}