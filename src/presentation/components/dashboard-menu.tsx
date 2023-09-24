import { AuthContext } from "@/application/contexts";
import { MeResponse } from "@/domain/@types";
import { Box, Flex } from "@chakra-ui/react";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { AiOutlineApi } from "react-icons/ai";
import { BsGear } from "react-icons/bs";
import { FiExternalLink } from "react-icons/fi";
import { RiLogoutCircleLine } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { TbDiscount2 } from "react-icons/tb";
import { DashboardNavigationLinks } from "./dashboardNavigationLink";

const inter = Inter({ subsets: ["latin"] });

type DashboardMenuProps = {
  me: MeResponse | undefined
}

const links = [
  {
    name: "Dashboard",
    destination: "/dashboard",
    icon: <RxDashboard />
  },
  {
    name: "Promoções",
    destination: "/dashboard/promocoes",
    icon: <TbDiscount2 />
  },
  {
    name: "Integrações",
    destination: "/dashboard/integracoes",
    icon: <AiOutlineApi />
  },
];

export function DashboardMenu({ me }: DashboardMenuProps) {
  const { signOut }= useContext(AuthContext);

  return (
    <Flex
      height={"100vh"}
      flexDirection={"column"}
      padding={{ xl: "2rem 2rem" }}
      position={"fixed"}
      fontFamily={inter.style.fontFamily}
    >
      <Box
        width={"120px"}
        height={"32px"}
        position={"relative"}
      >
        <Image
          src='/promogate-logo.svg'
          alt='Logo Promogate'
          fill
        />
      </Box>
      <Flex
        padding={["2rem 0"]}
        flexDirection={"column"}
        justifyContent={"space-between"}
        height={"100vh"}
        fontSize={{ xl: "0.8rem" }}
      >
        <DashboardNavigationLinks links={links} />
        <Flex
          padding={{ xl: "2rem 0" }}
          flexDirection={"column"}
          gap={{ xl: "16px" }}
          marginTop={"1"}
        >
          <Flex
            as={Link}
            href={`/dashboard/configuracoes`}
            alignItems={"center"}
            gap={"8px"}
            color={"gray.600"}
            cursor={"pointer"}
          >
            <BsGear />
            Configurações
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
            <FiExternalLink />
            Ver loja
          </Flex>
          <Flex
            onClick={signOut}
            alignItems={"center"}
            gap={"8px"}
            color={"gray.600"}
            cursor={"pointer"}
          >
            <RiLogoutCircleLine />
            Sair
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}