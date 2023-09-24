import {
  Grid,
  GridItem,
  Heading,
  Image,
  Skeleton
} from "@chakra-ui/react";

export function SingleStorePageLoader() {
  return (
    <>
      <Skeleton>
        <Heading
          as='h2'
          fontSize={["1rem"]}
          fontWeight={["semibold"]}
        >
          Store Content Loader
        </Heading>
      </Skeleton>
      <Grid
        height={["100vh"]}
        placeItems={["center"]}
        justifyContent={["center"]}
        gridTemplateColumns={["1fr", "1fr 1fr", "repeat(3, 1fr)", "repeat(4, 1fr)"]}
        margin={["1rem 0"]}
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
            >
              <Skeleton>
                <Image
                  src={""}
                  alt={""}
                  width={["160px"]}
                  height={["180px"]}
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
    </>
  );
}