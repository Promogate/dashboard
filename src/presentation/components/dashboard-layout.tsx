import { api } from "@/config";
import { MeResponse } from "@/domain/@types";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Inter } from "next/font/google";
import { parseCookies } from "nookies";
import { ReactNode } from "react";
import { DashboardMenu } from "./dashboard-menu";
import { DashboardMobileMenu } from "./dashboard-mobile-menu";

interface DashboardLayoutProps {
  children: ReactNode
}

const inter = Inter({ subsets: ["latin"] });

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const cookies = parseCookies();

  const { data } = useQuery({
    queryKey: ["user-profile", cookies["promogate.token"]],
    queryFn: async () => {
      const { data } = await api.get<MeResponse>("/users/me", {
        headers: {
          Authorization: `Bearer ${cookies["promogate.token"]}`
        }
      });

      return data;
    },
    staleTime: 1000 * 60 * 60 * 15,
  });

  return (
    <Grid
      gridTemplateColumns={["1fr", "1fr", "2fr 10fr"]}
      fontFamily={inter.style.fontFamily}
    >
      <GridItem
        height={["100vh"]}
        position={"relative"}
        display={["none", "none", "flex"]}
        borderRight={["1px"]}
        borderColor={["gray.200"]}
      >
        <DashboardMenu me={data} />
      </GridItem>
      <GridItem
        padding={[0, 0, "2rem"]}
        backgroundColor={"#F4F4F7"}
        minHeight={["100vh", "100vh", "max-content"]}
      >
        <Box
          display={["block", "block", "none"]}
          position={["sticky"]}
          top={0}
          zIndex={99}
        >
          <DashboardMobileMenu me={data} />
        </Box>
        <Box
          padding={["0 1rem", "0 1rem", 0]}
        >
          {children}
        </Box>
      </GridItem>
    </Grid>
  );
}