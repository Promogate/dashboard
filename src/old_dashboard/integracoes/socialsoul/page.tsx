"use client";

import { PromogateContext } from "@/application/contexts";
import { api } from "@/config";
import { DashboardLayout } from "@/presentation/components";
import { SocialSoulPage } from "@/presentation/pages";
import { Alert, AlertIcon, Box, Button, Flex, FormControl, FormLabel, Grid, Heading, Input, useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import Head from "next/head";
import { useRouter } from "next/router";
import { FormEvent, useContext, useState } from "react";
import { FiSend } from "react-icons/fi";

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

type IntegrationFormData = {
  sourceId: string | undefined;
  file: any | undefined;
}

export default function Page({ status, user }: any) {
  const [formData, setFormData] = useState<IntegrationFormData>({
    sourceId: undefined,
    file: undefined
  });

  const router = useRouter();

  const toast = useToast();

  const { authorization } = useContext(PromogateContext);

  function handleFormData(event: FormEvent<HTMLInputElement>) {
    event.preventDefault();
    setFormData({ ...formData, [event.currentTarget.name]: event.currentTarget.value });
  }

  const mutation = useMutation({
    mutationFn: async () => await handleUploadFormData(),
    onError: (error: any) => {
      toast({
        status: "error",
        description: error.message
      });
    },
    onSuccess: () => {
      toast({
        status: "success",
        description: "Atualizado com sucesso;"
      });
      router.reload();
    }
  });

  async function triggerMutation(): Promise<void> {
    await mutation.mutateAsync();
  };

  async function handleUploadFormData() {
    const fileData = new FormData();
    fileData.append("file", formData.file);
    try {
      await api.post(`/upload/${user.user_profile.store_name}`, fileData, {
        headers: {
          Authorization: authorization
        }
      });
      await api.put(`/users/profile/${user.user_profile.id}/update`, {
        lomadeeSourceId: formData.sourceId
      }, {
        headers: {
          Authorization: authorization
        }
      });
    } catch (err: any) {
      toast({
        status: "error",
        description: "Algo deu errado"
      });
    }
  }

  function handleFile(event: FormEvent<HTMLInputElement>) {
    event.preventDefault();
    if (event.currentTarget.files) {
      setFormData({ ...formData, file: event.currentTarget.files[0] });
    }
  }

  if (!user.user_profile.lomadee_source_id || user.user_profile.lomadee_source_id === "") {
    return (
      <>
        <Head>
          <title>Promogate - Integração SocialSoul</title>
        </Head>
        <DashboardLayout>
          <Flex
            width={["100%"]}
            marginBottom={["2rem"]}
          >
            <Heading
              as={"h2"}
              fontSize={["2rem"]}
              color={"gray.600"}
            >
              Integrações
            </Heading>
          </Flex>
          <Alert
            status='warning'
            marginBottom={["2rem"]}
          >
            <AlertIcon />
            Estamos trabalhando para finalizar a integração com a SocialSoul
          </Alert>
          <Grid
            height={["100vh"]}
            placeItems={["center"]}
          >
            <Box
              display={["grid"]}
              gap={["1rem"]}
              as='form'
              width={["400px"]}
              backgroundColor={["white"]}
              padding={["2rem"]}
              borderRadius={["lg"]}
              border={["1px"]}
              borderColor={["gray.200"]}
            >
              <FormControl>
                <FormLabel htmlFor='sourceId'>Insira seu sourceId</FormLabel>
                <Input
                  name='sourceId'
                  type='text'
                  onChange={(e) => handleFormData(e)}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor='sourceId'>Arquivo de verificação HTML</FormLabel>
                <Input
                  name='file'
                  type='file'
                  accept='.html'
                  onChange={(e) => handleFile(e)}
                  border={"none"}
                />
              </FormControl>
              <Button
                leftIcon={<FiSend />}
                colorScheme={"green"}
                onClick={triggerMutation}
                isLoading={mutation.isLoading}
              >
                Enviar informações
              </Button>
            </Box>
          </Grid>
        </DashboardLayout>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Promogate - Integração SocialSoul</title>
      </Head>
      <DashboardLayout>
        <Flex
          width={["100%"]}
          marginBottom={["2rem"]}
        >
          <Heading
            as={"h2"}
            fontSize={["2rem"]}
            color={"gray.600"}
          >
            Integrações
          </Heading>
        </Flex>
        <Alert
          status='warning'
          marginBottom={["2rem"]}
        >
          <AlertIcon />
          Estamos trabalhando para finalizar a integração com a SocialSoul
        </Alert>
        <SocialSoulPage user={user} status={status} />
      </DashboardLayout>
    </>
  );
}