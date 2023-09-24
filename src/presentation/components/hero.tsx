"use client";

import {
  Button,
  Flex,
  Heading,
  Text
} from "@chakra-ui/react";
import {
  Montserrat,
  Open_Sans
} from "next/font/google";
import { useRouter } from "next/navigation";

const openSans = Open_Sans({ subsets: ["latin"], preload: true });
const montserrat = Montserrat({ subsets: ["latin"], preload: true });

export function Hero() {
  const router = useRouter();

  return (
    <Flex
      paddingRight={{ xl: "320px" }}
      flexDirection={"column"}
      gap={"32px"}
      color={"#2b2b2b"}
      margin={["3rem 0", "0 auto"]}
      backgroundImage={"/hero_image.svg"}
      backgroundRepeat={"no-repeat"}
      backgroundSize={["240px", "500px"]}
      backgroundPosition={["bottom" ,"right"]}
    >
      <Heading
        as='h1'
        fontSize={["3rem", "3rem", "5rem"]}
        fontFamily={montserrat.style.fontFamily}
      >
        Sua estrutura digital como afiliado, <Text as={"span"} color={"#5528FF"}>gratuita</Text>.
      </Heading>
      <Text
        fontFamily={openSans.style.fontFamily}
        fontSize={"21px"}
        width={{ xl: "80%" }}
      >
        Nunca foi tão fácil ter uma estrutura digital para divulgar os produtos
        e lojas que você é afiliado. Tenha um painel administrativo fácil de gerir
        e um site somente para você.
      </Text>
      <Button
        width={["100%", "max-content"]}
        backgroundColor={"#5528FF"}
        _hover={{ backgroundColor: "#5528FF" }}
        color={"white"}
        onClick={() => router.push("/cadastrar-se")}
        marginTop={["120px", 0]}
        size={["lg", "md"]}
      >
        Começar agora!
      </Button>
    </Flex>
  );
}