import { Box, Grid, Spinner } from "@chakra-ui/react";
import Image from "next/image";

export function ContentLoader() {
  return (
    <>
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