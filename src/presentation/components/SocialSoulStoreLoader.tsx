import {
  Grid,
  GridItem,
  Heading,
  Image,
  Skeleton
} from "@chakra-ui/react";
import Link from "next/link";

export function SocialSoulStoreLoader() {
  return (
    <Grid
      gridTemplateColumns={["1fr", "1fr", "repeat(3, 1fr)", "repeat(4, 1fr)"]}
      width={["100%"]}
      gap={["1rem"]}
    >
      {Array.from({ length: 20 }).map((_, index) => {
        return (
          <GridItem
            key={index}
            backgroundColor={["white"]}
            display={["flex"]}
            gap={["1rem"]}
            flexDir={["column"]}
            alignItems={["center"]}
            borderRadius={["lg"]}
            padding={["1rem"]}
            as={Link}
            href={``}
          >
            <Skeleton>
              <Image
                src={""}
                alt={""}
                width={["48px"]}
                height={["48px"]}
              />
            </Skeleton>
            <Skeleton>
              <Heading
                as='h2'
                fontSize={["1rem"]}
                fontWeight={["semibold"]}
              >
                Content is loading
              </Heading>
            </Skeleton>
          </GridItem>
        );
      })}
    </Grid>
  );
}