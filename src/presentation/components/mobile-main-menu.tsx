import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import { Open_Sans } from "next/font/google";
import Link from "next/link";
import { BsArrowRightShort } from "react-icons/bs";
import { RiMenu3Line } from "react-icons/ri";

const openSans = Open_Sans({ subsets: ["latin"], preload: true });

type MobileMainMenuProps = {
  isLogged: boolean
}

export function MobileMainMenu({ isLogged }: MobileMainMenuProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex
        display={{ base: "flex", md: "none" }}
        width={"100%"}
        justifyContent={"flex-end"}
      >
        <IconButton
          onClick={onOpen}
          aria-label='abrir menu'
          icon={<RiMenu3Line />}
          backgroundColor={"#5528FF"}
          color={"white"}
        />
      </Flex>
      <Drawer
        isOpen={isOpen}
        placement={"right"}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent
          backgroundColor={"#5528ff"}
          color={"white"}
          height={["100vh"]}
        >
          <DrawerCloseButton />
          <DrawerHeader></DrawerHeader>
          <DrawerBody
            fontFamily={openSans.style.fontFamily}
          >
            <Flex
              width={"100%"}
              height={"100%"}
              justify={"flex-end"}
              align={"flex-end"}
              gap={"24px"}
              flexDirection={"column"}
            >
              <Link
                href={"/quem-somos"}
              >
                Quem somos
              </Link>
              <Link
                href={"/como-funciona"}
              >
                Como funciona
              </Link>
            </Flex>
          </DrawerBody>
          <DrawerFooter>
            <Flex
              gap={"16px"}
              alignItems={"center"}
              fontSize={"0.8rem"}
              color={"gray.500"} width={"100%"}
              justifyContent={"flex-end"}
              display={"flex"}
            >
              {
                isLogged ? (
                  <Flex
                    fontFamily={openSans.style.fontFamily}
                    fontSize={"0.825rem"}
                    gap={"2px"}
                    alignItems={"center"}
                    margin={["2rem 0"]}
                    color={"white"}
                  >
                    <Text>Você está logado. Ir para o </Text>
                    <Text
                      as={Link} href={"/dashboard"}
                      fontWeight={"semibold"}
                      color={"#F8AFFF"}
                      display={"flex"}
                      alignItems={"center"}
                    >
                      Dashboard
                      <BsArrowRightShort />
                    </Text>
                  </Flex>
                ) : (
                  <Flex
                    gap={"1rem"}
                    width={"100%"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    margin={"2rem 0"}
                  >
                    <Button
                      as={Link}
                      href={"/cadastrar-se"}
                      fontFamily={openSans.style.fontFamily}
                      fontSize={{ xl: "1rem" }}
                      color={"white"}
                      variant={"outline"}
                      fontWeight={"bold"}
                      borderColor={"white"}
                    >
                      Cadastrar-se
                    </Button>
                    <Box
                      as={Link}
                      href={"/login"}
                      fontFamily={openSans.style.fontFamily}
                      fontSize={{ xl: "1rem" }}
                      color={"white"}
                      fontWeight={"bold"}
                    >
                      Entrar
                    </Box>
                  </Flex>
                )
              }
            </Flex >
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}