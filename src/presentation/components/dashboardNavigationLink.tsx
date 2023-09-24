import { Flex } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

type Link = {
  name: string;
  destination: string;
  icon: JSX.Element;
}

type DashboardNavigationLinksProps = {
  links: Link[]
}

export function DashboardNavigationLinks({ links }: DashboardNavigationLinksProps) {
  const router = useRouter();

  return (
    <Flex
      flexDirection={"column"}
      gap={["0.5rem"]}
    >
      {
        links.map((link, i) => {
          return (
            <Flex
              as={Link}
              href={link.destination}
              alignItems={"center"}
              gap={"8px"}
              key={i}
              backgroundColor={router.asPath == link.destination ? "#5528FF" : undefined}
              color={router.asPath == link.destination ? "white" : "gray.600"}
              padding={["0.5rem"]}
              borderRadius={["md"]}
            >
              {link.icon}
              {link.name}
            </Flex>
          );
        })
      }
    </Flex>
  );
}