import { Box, Button, Flex, Grid, Text } from "@chakra-ui/react";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { BsArrowRightShort } from "react-icons/bs";
import { MobileMainMenu } from "./mobile-main-menu";

const montserrat = Montserrat({ subsets: ["latin"] });

type MainMenuProps = {
  isLogged: boolean
}

export function MainMenu({ isLogged }: MainMenuProps) {
  return (
    <Grid
      gridTemplateColumns={["1fr 1fr", "1fr 1fr", "160px 1fr auto", "160px 1fr auto", "160px 1fr auto"]}
      height={["60px", "80px","104px"]}
      alignItems={"center"}
      maxWidth={{ xl: "1170px" }}
      margin={"0 auto"}
      gap={["40px", "40px", "40px", "80px", "80px"]}
      padding={["1rem", "1rem", "1rem", "1rem", 0]}
    >
      <Box
        as={Link}
        href='/'
        position={"relative"}
        height={"30px"}
        width={"160px"}
      >
        <Image src={"/promogate-logo.svg"} alt={"Promogate logo"} fill priority />
      </Box>
      <MobileMainMenu isLogged={isLogged} />
      <Flex
        fontFamily={montserrat.style.fontFamily}
        gap={["32px", "48px", "48px", "48px", "48px"]}
        alignItems={"center"}
        fontWeight={"medium"}
        display={["none", "none", "flex", "flex", "flex"]}
      >
        <Text as={Link} href={"/quem-somos"}>
          Quem somos
        </Text>
        <Text as={Link} href={"/como-funciona"}>
          Como funciona
        </Text>
        <Text as={Link} href={"https://blog.promogate.app"} fontSize={["1rem"]} target='_blank'>
          Blog
        </Text>
      </Flex>
      <Flex
        gap={"16px"}
        alignItems={"center"}
        fontSize={"0.8rem"}
        color={"gray.500"} width={"100%"}
        justifyContent={"flex-end"}
        display={["none", "none", "flex", "flex", "flex"]}
      >
        {
          isLogged ? (
            <Flex
              fontFamily={montserrat.style.fontFamily}
              fontSize={{ xl: "0.825rem" }}
              gap={"2px"}
              alignItems={"center"}
              margin={{ xl: "0.5rem 0 0 0" }}
            >
              <Text>Você está logado. Ir para o </Text>
              <Text
                as={Link} href={"/dashboard"}
                fontWeight={"semibold"}
                color={"#571770"}
                display={"flex"}
                alignItems={"center"}
              >
                Dashboard
                <BsArrowRightShort />
              </Text>
            </Flex>
          ) : (
            <Flex
              gap={["1rem", "1.5rem", "1.5rem", "1.5rem", "1.5rem"]}
              width={"100%"}
              justifyContent={"flex-end"}
              alignItems={"center"}
            >
              <Box
                as={Link}
                href={"/login"}
                fontFamily={montserrat.style.fontFamily}
                fontSize={{ xl: "1rem" }}
                color={"#2b2b2b"}
                fontWeight={"bold"}
              >
                Entrar
              </Box>
              <Button
                as={Link}
                href={"/cadastrar-se"}
                target='_blank'
                fontFamily={montserrat.style.fontFamily}
                fontSize={{ xl: "1rem" }}
                color={"#2b2b2b"}
                variant={"outline"}
                fontWeight={"bold"}
                borderColor={"#2b2b2b"}
              >
                Começar agora
              </Button>
            </Flex>
          )
        }
      </Flex >
    </Grid >
  );
}