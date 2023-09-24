import { Box, Flex, Heading } from "@chakra-ui/react";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { SocialIcons } from "./socialIcons";

type SocialMedia = {
  facebook?: string;
  whatsapp?: string;
  instagram?: string;
  telegram?: string;
  twitter?: string;
};

type StoreHeaderProps = {
  props: {
    store_image: string;
    store_name_display: string;
    store_name: string;
    social_media?: SocialMedia
  }
}

const montserrat = Montserrat({ subsets: ["latin"], preload: true });

/*eslint-disable @next/next/no-img-element*/
export function StoreHeader({ props }: StoreHeaderProps) {
  const [socialMedia, setSocialMedia] = useState<SocialMedia>({
    facebook: props.social_media?.facebook,
    whatsapp: props.social_media?.whatsapp,
    instagram: props.social_media?.instagram,
    telegram: props.social_media?.telegram,
    twitter: props.social_media?.twitter
  });

  return (
    <>
      <Box
        height={["80px", "160px"]}
        padding={["1rem"]}
        backgroundColor={"gray.400"}
      >
      </Box>
      <Flex
        height={"100%"}
        width={["100%"]}
        alignItems={"center"}
        maxWidth={["1170px"]}
        margin={["0 auto"]}
        gap={["1rem"]}
        padding={["0 1rem", "0 1rem", "0 1rem", 0]}
        justifyContent={["space-between"]}
      >
        <Flex
          marginTop={["-1rem", "-32px", "-32px"]}
          flex={1}
          alignItems={"center"}
          gap={["1rem"]}
        >
          {
            props.store_image ? (
              <Box
                as={Link}
                href={`/${props.store_name}`}
                position='relative'
                width={["120px", "160px"]}
                height={["120px", "160px"]}
                rounded={"full"}
                border={["1px"]}
                borderColor={["white"]}
                overflow={"hidden"}
                boxShadow={["sm"]}
              >
                <Image
                  src={props.store_image}
                  alt={props.store_name_display}
                  fill
                  priority
                />
              </Box>
            ) : null
          }
          <Flex
            flexDirection={["column"]}
          >
            <Heading
              as={Link}
              href={`/${props.store_name}`}
              fontSize={["1.275rem", "1.5rem"]}
              fontFamily={montserrat.style.fontFamily}
              color={"gry.700"}
              textTransform={["capitalize"]}
              margin={["0 0 0.5rem 0"]}
            >
              {props.store_name_display}
            </Heading>
            <SocialIcons social={socialMedia} />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}