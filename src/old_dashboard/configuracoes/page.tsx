
"use client";

import { PromogateContext } from "@/application/contexts";
import { DashboardLayout } from "@/presentation/components";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Icon,
  IconButton,
  Input,
  Text,
  useToast
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Montserrat } from "next/font/google";
import { parseCookies } from "nookies";
import { ChangeEvent, Fragment, useCallback, useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BsUpload } from "react-icons/bs";
import { TiDelete } from "react-icons/ti";

import { AWSUploadService } from "@/application/services";
import { makeUniqueStoreName } from "@/application/utils/makeUniqueStoreName";
import { api } from "@/config";
import { RequestError } from "@/domain/models";
import { AxiosError } from "axios";
import Head from "next/head";

const montserrat = Montserrat({ subsets: ["latin"], preload: true });

const s3Upload = new AWSUploadService();

type UpdateProfileBody = {
  store_image?: string;
  store_name?: string;
  store_name_display?: string;
  facebook?: string;
  instagram?: string;
  whatsapp?: string;
  telegram?: string;
  twitter?: string;
}

// export const getServerSideProps = withSSRAuth(async (ctx) => {
//   const cookies = parseCookies(ctx);

//   const { data } = await api.get<MeResponse>("/users/me", {
//     headers: {
//       Authorization: `Bearer ${cookies["promogate.token"]}`
//     }
//   });

//   return {
//     props: {
//       status: data.status,
//       user: data.user
//     }
//   };
// });

/*eslint-disable @next/next/no-img-element*/
export default function Page({ status, user }: any) {
  const toast = useToast();
  const [localImageUrl, setLocalImageUrl] = useState(user.user_profile.store_image);
  const [sampleUrl, setSampleUrl] = useState(user.user_profile.store_name);
  const [uniqueName, setUniqueName] = useState<string>(user.user_profile.store_name);
  const { authorization } = useContext(PromogateContext);
  const cookies = parseCookies();
  const query = useQueryClient();

  const handleImageUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
      if (!event.target.files?.length) {
        return;
      }

      setLocalImageUrl(URL.createObjectURL(event.target.files[0]));
    }, []
  );

  const { register, handleSubmit, formState: { isSubmitting } } = useForm<UpdateProfileBody>({
    defaultValues: {
      store_name_display: user.user_profile.store_name_display,
      facebook: user.user_profile.social_media?.facebook,
      instagram: user.user_profile.social_media?.instagram,
      whatsapp: user.user_profile.social_media?.whatsapp,
      telegram: user.user_profile.social_media?.telegram,
      twitter: user.user_profile.social_media?.twitter,
    }
  });

  const updateMutation = useMutation(async (values: UpdateProfileBody) => {
    await api.put(`/users/profile/${user.user_profile.id}/update`, values, {
      headers: {
        Authorization: authorization
      }
    });
  }, {
    onSuccess: () => {
      query.invalidateQueries(["user-profile", cookies["promogate.token"]]);
      toast({
        status: "success",
        description: "Atualizado com sucesso"
      });
    },
    onError: (err: AxiosError<RequestError>) => {
      toast({
        status: "error",
        description: err.response?.data.message
      });
    }
  });

  const getAWSImageUrl = async (user_id: string): Promise<string> => {
    const file = await fetch(localImageUrl).then(r => r.blob()).then(blobFile => new File([blobFile], `store_image.${user_id}`));
    const { url } = await s3Upload.uploadImage({ file, user: user_id });
    return url;
  };

  const handleUpdateProfile: SubmitHandler<UpdateProfileBody> = async (values) => {
    if (localImageUrl !== user.user_profile.store_image) {
      const url = await getAWSImageUrl(user.id);
      await updateMutation.mutateAsync({
        ...values,
        store_name: uniqueName,
        store_image: url
      });
    } else {
      await updateMutation.mutateAsync({
        ...values,
        store_name: uniqueName
      });
    }
  };

  const handleUniqueName = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const parsed = makeUniqueStoreName(e.currentTarget.value) as string;
    setUniqueName(parsed);
  };

  return (
    <Fragment>
      <Head>
        <title>Promogate - Configurações da Loja</title>
      </Head>
      <DashboardLayout>
        <Heading
          as={"h2"}
          fontSize={["2rem"]}
          fontFamily={montserrat.style.fontFamily}
          color={"gray.600"}
        >
          Configurações
        </Heading>
        <Grid
          margin={["1rem 0"]}
          gap={{ xl: "1rem" }}
          gridTemplateColumns={{ xl: "1fr 145px" }}
          position={"relative"}
        >
          <Grid
            as='form'
            onSubmit={handleSubmit(handleUpdateProfile)}
            autoComplete='off'
            backgroundColor={"white"}
            padding={["1rem"]}
            border={["1px"]}
            borderColor={["gray.200"]}
            borderRadius={["lg"]}
          >
            <FormControl margin={"0 auto"}>
              {
                localImageUrl ? (
                  <>
                    <FormLabel
                      border={"1px"}
                      borderColor={"gray.300"}
                      borderRadius={"full"}
                      borderStyle={"dashed"}
                      width={"120px"}
                      height={"120px"}
                      cursor={"pointer"}
                      margin={"0 auto"}
                      display={"grid"}
                      placeItems={"center"}
                      gap={"1px"}
                      overflow={"hidden"}
                      position={"relative"}
                    >

                      <img
                        src={localImageUrl}
                        alt='Store image'
                      />
                      <Input
                        type='file'
                        onChange={handleImageUpload}
                        display={"none"}
                      />
                    </FormLabel>
                    <IconButton
                      aria-label='deleteImage'
                      icon={<TiDelete />}
                      position={"absolute"}
                      right={"40%"}
                      top={0}
                      zIndex={10}
                      colorScheme={"red"}
                      rounded={"full"}
                      size={"xs"}
                      onClick={() => setLocalImageUrl("")}
                    />
                  </>
                ) : (
                  <FormLabel
                    border={"1px"}
                    borderColor={"gray.300"}
                    borderRadius={"full"}
                    borderStyle={"dashed"}
                    width={"120px"}
                    height={"120px"}
                    cursor={"pointer"}
                    margin={"0 auto"}
                    display={"grid"}
                    placeItems={"center"}
                    gap={"1px"}
                  >
                    <Flex
                      width={"100%"}
                      flexDirection={"column"}
                      alignItems={"center"}
                      color={"gray.400"}
                    >
                      <Icon as={BsUpload} />
                      <Text
                        fontFamily={montserrat.style.fontFamily}
                        fontSize={{ xl: "0.8rem" }}
                        fontWeight={{ xl: "normal" }}
                      >
                        Envie sua logo
                      </Text>
                    </Flex>
                    <Input
                      type='file'
                      onChange={handleImageUpload}
                      display={"none"}
                    />
                  </FormLabel>
                )
              }
            </FormControl>
            <Grid
              marginTop={["1rem"]}
              gridTemplateColumns={["1fr 1fr"]}
              gap={["1rem"]}
            >
              <FormControl>
                <FormLabel
                  fontFamily={montserrat.style.fontFamily}
                >
                  Usuário único da loja
                </FormLabel>
                <Input
                  type='text'
                  value={uniqueName}
                  onChange={handleUniqueName}
                />
                <Box
                  minWidth={{ xl: "100px" }}
                  padding={{ xl: "0.5rem 0" }}
                  minHeight={{ xl: "1.5rem" }}
                >
                  <Text
                    fontSize={{ xl: "0.725rem" }}
                    color={"gray.400"}
                  >
                    Como será a sua url:
                    {` https://promogate.app/${uniqueName}`}
                  </Text>
                </Box>
              </FormControl>
              <FormControl>
                <FormLabel
                  fontFamily={montserrat.style.fontFamily}
                >
                  Nome da loja
                </FormLabel>
                <Input
                  type='text'
                  {...register("store_name_display")}
                />
              </FormControl>
            </Grid>
            <Grid
              margin={{ xl: "1rem 0" }}
              gap={{ xl: "0.5rem" }}
            >
              <Heading
                as={"h3"}
                fontSize={{ xl: "lg" }}
                color={"gray.600"}
                marginBottom={{ xl: "1rem" }}
              >
                Redes sociais
              </Heading>
              <FormControl>
                <FormLabel
                  fontFamily={montserrat.style.fontFamily}
                >
                  Facebook
                </FormLabel>
                <Input
                  type='text'
                  {...register("facebook")}
                  width={{ xl: "50%" }}
                />
              </FormControl>
              <FormControl>
                <FormLabel
                  fontFamily={montserrat.style.fontFamily}
                >
                  Whastapp
                </FormLabel>
                <Input
                  type='text'
                  {...register("whatsapp")}
                  width={{ xl: "50%" }}
                />
              </FormControl>
              <FormControl>
                <FormLabel
                  fontFamily={montserrat.style.fontFamily}
                >
                  Instagram
                </FormLabel>
                <Input
                  type='text'
                  {...register("instagram")}
                  width={{ xl: "50%" }}
                />
              </FormControl>
              <FormControl>
                <FormLabel
                  fontFamily={montserrat.style.fontFamily}
                >
                  Telegram
                </FormLabel>
                <Input
                  type='text'
                  {...register("telegram")}
                  width={{ xl: "50%" }}
                />
              </FormControl>
              <FormControl>
                <FormLabel
                  fontFamily={montserrat.style.fontFamily}
                >
                  Twitter
                </FormLabel>
                <Input
                  type='text'
                  {...register("twitter")}
                  width={{ xl: "50%" }}
                />
              </FormControl>
            </Grid>
            <Button
              type='submit'
              fontFamily={montserrat.style.fontFamily}
              backgroundColor={"black"}
              color={"white"}
              _hover={{
                backgroundColor: "black"
              }}
              size={["lg"]}
              marginTop={["1rem"]}
            // isLoading={isSubmitting}
            >
              Atualizar
            </Button>
          </Grid>
        </Grid>
      </DashboardLayout>
    </Fragment>
  );
}
