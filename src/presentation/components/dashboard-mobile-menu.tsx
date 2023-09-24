import { MeResponse } from "@/domain/@types";
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  useDisclosure,
  useToast
} from "@chakra-ui/react";
import { Open_Sans } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { destroyCookie } from "nookies";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BsGear } from "react-icons/bs";
import { FiExternalLink } from "react-icons/fi";
import { RiLogoutCircleLine, RiMenu3Line } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { TbDiscount2 } from "react-icons/tb";

const openSans = Open_Sans({ subsets: ["latin"], preload: true });

type DashboardMobileMenuProps = {
  me: MeResponse | undefined
}

export function DashboardMobileMenu({ me }: DashboardMobileMenuProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const toast = useToast();

  const handleLogout = () => {
    try {
      destroyCookie(null, "promogate.token");
    } catch {
      toast({
        status: "error",
        description: "Erro eu tentar fazer logout"
      });
    } finally {
      router.push("/login");
    }
  };

  return (
    <>
      <Flex
        display={["flex", "flex", "none"]}
        padding={["2rem 1rem"]}
        width={"100%"}
        justifyContent={"space-between"}
        backgroundColor={["white"]}
      >
        <Box
          as={Link}
          href='/'
          position={"relative"}
          height={"30px"}
          width={"160px"}
        >
          <Image
            src={"/promogate-logo.svg"}
            alt={"Promogate logo"}
            fill
            priority
          />
        </Box>
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
          color={"white"}
          height={["100vh"]}
        >
          <DrawerHeader></DrawerHeader>
          <DrawerBody
            fontFamily={openSans.style.fontFamily}
          >
            <Flex
              flexDirection={"column"}
              justifyContent={"space-between"}
              alignItems={"end"}
              height={["100%"]}
              fontSize={["1rem"]}
              color={"white"}
            >
              <Flex
                flexDirection={"column"}
                gap={["16px"]}
                alignItems={"end"}
              >
                <Flex
                  as={Link}
                  href={`/dashboard/configuracoes`}
                  alignItems={"center"}
                  gap={"8px"}
                  color={"gray.600"}
                  cursor={"pointer"}
                >
                  Configurações
                  <BsGear />
                </Flex>
                <Flex
                  as={Link}
                  href={`/${me?.user.user_profile.store_name}`}
                  target='_blank'
                  alignItems={"center"}
                  gap={"8px"}
                  color={"gray.600"}
                  cursor={"pointer"}
                >
                  Ver loja
                  <FiExternalLink />
                </Flex>
                <Flex
                  onClick={handleLogout}
                  alignItems={"center"}
                  gap={"8px"}
                  color={"gray.600"}
                  cursor={"pointer"}
                >
                  Sair
                  <RiLogoutCircleLine />
                </Flex>
              </Flex>
              <Flex
                flexDirection={"column-reverse"}
                alignItems={"end"}
                gap={["2rem"]}
              >
                <Flex
                  as={Link}
                  href={"/dashboard"}
                  alignItems={"center"}
                  gap={"8px"}
                  color={"gray.600"}
                >
                  Dashboard
                  <RxDashboard />
                </Flex>
                <Flex
                  as={Link}
                  href={"/dashboard/promocoes"}
                  alignItems={"center"}
                  gap={"8px"}
                  color={"gray.600"}
                >
                  Promoções
                  <TbDiscount2 />
                </Flex>
              </Flex>
              <IconButton
                aria-label='Fechar menu'
                as={AiOutlineCloseCircle}
                onClick={onClose}
                color={["#2b2b2b"]}
                backgroundColor={"transparent"}
              />
            </Flex>
            <DrawerCloseButton />
          </DrawerBody>
          <DrawerFooter>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}