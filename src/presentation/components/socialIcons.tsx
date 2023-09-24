import { Flex, IconButton } from "@chakra-ui/react";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaTelegram, FaTwitter, FaWhatsapp } from "react-icons/fa";

type SocialIconsProps = {
  social: {
    facebook?: string;
    whatsapp?: string;
    instagram?: string;
    telegram?: string;
    twitter?: string;
  }
}

const icons: Record<string, JSX.Element> = {
  facebook: <FaFacebook />,
  whatsapp: <FaWhatsapp />,
  instagram: <FaInstagram />,
  telegram: <FaTelegram />,
  twitter: <FaTwitter />,
};

export function SocialIcons({ social }: SocialIconsProps) {
  const result = Object.entries(social);
  const socialLinks = result.filter(element => element[1] !== "");

  return (
    <Flex
      gap={["1rem"]}
    >
      {
        socialLinks.map((element, i) => {
          return (
            <Link
              key={i}
              target='_blank'
              href={element[1] ? element[1] : ""}
            >
              <IconButton
                size={["xs", "sm"]}
                aria-label={`Rede social ${element[0]}`}
                icon={icons[`${element[0]}`]}
                backgroundColor={"gray.400"}
                color={"white"}
                _hover={{
                  backgroundColor: "gray.500"
                }}
              />
            </Link>
          );
        })
      }
    </Flex>
  );
}
