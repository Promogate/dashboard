import { Box, Grid, Heading } from "@chakra-ui/react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], preload: true });

export function StoreFooter() {
  return (
    <Box
      backgroundColor={"#EBEBEB"}
    >
      <Grid
        height={"20vh"}
        margin={"0 auto"}
        maxWidth={["1170px"]}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Heading
          as={"p"}
          fontSize={"14px"}
          fontWeight={"normal"}
          fontFamily={inter.style.fontFamily}
        >
          &copy; 2023 Promogate. Todos os direitos reservados.
        </Heading>
      </Grid>
    </Box>
  );
}