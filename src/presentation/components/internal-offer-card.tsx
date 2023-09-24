import { PromogateContext } from "@/application/contexts";
import { api } from "@/config";
import { Offer } from "@/domain/models";
import { Box, Flex, Heading, Switch, useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { Inter } from "next/font/google";
import Link from "next/link";
import { ChangeEvent, useContext } from "react";

type InternalOfferCardProps = {
  data: Offer;
}

type UpdateOfferShowcase = {
  is_on_showcase: boolean;
  offerId: string
}

type UpdateOfferFeatured = {
  is_featured: boolean;
  offerId: string
}

const inter = Inter({ subsets: ["latin"] });

/*eslint-disable @next/next/no-img-element*/
export function InternalOfferCard({ data }: InternalOfferCardProps) {
  const toast = useToast();

  const { authorization } = useContext(PromogateContext);

  const mutation = useMutation({
    mutationFn: async ({ is_on_showcase, offerId }: UpdateOfferShowcase) => {
      await api.put(`/resources/offer/${offerId}/update/showcase`, {
        is_on_showcase
      }, {
        headers: {
          Authorization: authorization
        }
      });
    },
    onError: () => {
      toast({
        status: "error",
        description: "Houve algum erro"
      });
    }
  });

  const isFeatured = useMutation({
    mutationFn: async ({ is_featured, offerId }: UpdateOfferFeatured) => {
      await api.put(`/resources/offer/${offerId}/update/featured`, {
        is_featured
      }, {
        headers: {
          Authorization: authorization
        }
      });
    },
    onError: () => {
      toast({
        status: "error",
        description: "Houve algum erro"
      });
    }
  });

  const handleShowcaseStatus = async (e: ChangeEvent<HTMLInputElement>, offerId: string) => {
    e.preventDefault();
    await mutation.mutateAsync({
      is_on_showcase: e.currentTarget.checked,
      offerId
    });
  };

  const handleIsFeaturedStatus = async (e: ChangeEvent<HTMLInputElement>, offerId: string) => {
    e.preventDefault();
    await isFeatured.mutateAsync({
      is_featured: e.currentTarget.checked,
      offerId
    });
  };

  return (
    <Flex
      as={Link}
      href={"#"}
      padding={["1rem"]}
      backgroundColor={"white"}
      flexDirection={"column"}
      border={["1px"]}
      borderColor={["gray.200"]}
      borderRadius={["1rem"]}
      overflow={["hidden"]}
      fontFamily={inter.style.fontFamily}
    >
      <Box
        borderRadius={{ xl: "1rem" }}
        overflow={"hidden"}
        height={{ xl: "160px" }}
      >

        <img
          className='object-contain h-full w-full'
          src={data.image}
          alt={data.title}
        />
      </Box>
      <Box
        flex={1}
        marginTop={{ xl: "1rem" }}
        display={"flex"}
        flexDirection={"column"}
      >
        <Box flex={1}>
          <Heading
            fontFamily={inter.style.fontFamily}
            fontSize={{ xl: "14px" }}
            fontWeight={"medium"}
            color={"gray.700"}
            wordBreak={"break-word"}
            padding={["1rem 0"]}
          >
            {data.title}
          </Heading>
        </Box>
        <Box>
          <Switch
            value={String(data.is_on_showcase) === "false" ? "true" : "false"}
            onChange={(e) => handleShowcaseStatus(e, data.id)}
            defaultChecked={data.is_on_showcase}
            colorScheme='green'
          />
          <Switch
            value={String(data.is_featured) === "false" ? "true" : "false"}
            onChange={(e) => handleIsFeaturedStatus(e, data.id)}
            defaultChecked={data.is_featured}
            colorScheme='green'
          />
        </Box>
      </Box>
    </Flex>
  );
}