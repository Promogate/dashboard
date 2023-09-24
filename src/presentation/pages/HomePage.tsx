"use client";

import { Hero, HomeFooter, MainMenu } from "@/presentation/components";
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text
} from "@chakra-ui/react";
import { Montserrat, Open_Sans } from "next/font/google";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { FiExternalLink } from "react-icons/fi";

const montserrat = Montserrat({ subsets: ["latin"], preload: true });
const openSans = Open_Sans({ subsets: ["latin"], preload: true });

type HomepageProps = {
  isLogged: boolean
};

export default function HomePage({ isLogged }: HomepageProps) {
  return (
    <>
      <Head>
        <title>Promogate - Plataforma Digital Gratuita, Métricas e Compartilhamento para o Afiliado</title>
        <meta name="lomadee-verification" content="22803701" />
        <meta name='robots' content='max-image-preview:large' />
        <meta property='og:title' content="Promogate" />
        <meta property='og:description' content="Plataforma Digital Gratuita, Métricas e Compartilhamento para o Afiliado"/>
        <meta property='og:type' content='site' />
        <meta property='og:image' content={"/logo_1080x1080.png"} />
        <meta property="og:image:width" content="1080" />
        <meta property="og:image:height" content="1080" />
        <meta property="og:image:alt" content="Promogate - Plataforma Digital Gratuita, Métricas e Compartilhamento para o Afiliado"/>
        <meta property='og:site_name' content='Promogate' />
        <meta property='og:locale' content='pt_BR' />
        <meta property='og:url' content={`https://promogate.app`} />
        <meta property='twitter:card' content='summary_large_image' />
        <meta property='twitter:site' content='@promogate' />
        <meta property='twitter:title' content="Promogate - Plataforma Digital Gratuita, Métricas e Compartilhamento para o Afiliado" />
        <meta property='twitter:description' content="Plataforma Digital Gratuita, Métricas e Compartilhamento para o Afiliado" />
        <meta property='twitter:image' content={"/logo_1080x1080.png"} />
        <meta property='twitter:creator' content="@promogate" />
        <meta property='fb:app_id' content="106988875737461" />
      </Head>
      <MainMenu isLogged={isLogged} />
      <Box
        as='main'
        maxWidth={{ xl: "1170px" }}
        margin={["0 1rem", "0 1rem", "0 auto", "0 auto", "0 auto"]}
      >
        <Hero />
        <Grid
          maxWidth={"1170px"}
          margin={["4rem 0", "104px auto"]}
          gridTemplateColumns={{ xl: "1fr 1fr" }}
          alignItems={{ xl: "center" }}
        >
          <Box>
            <Text
              fontSize={"2xl"}
              textTransform={"uppercase"}
              letterSpacing={"widest"}
              fontWeight={"light"}
              fontFamily={montserrat.style.fontFamily}
            >
              Tudo em um só lugar
            </Text>
            <Heading
              fontFamily={montserrat.style.fontFamily}
              width={{ xl: "72%" }}
              marginTop={"24px"}
            >
              Aumente seu alcance como afiliado
            </Heading>
            <Text
              fontWeight={"normal"}
              width={{ xl: "72%" }}
              marginTop={"32px"}
              fontFamily={openSans.style.fontFamily}
              fontSize={["21px"]}
            >
              Cadastre seus produtos em um só lugar e tenha sua estrutura digital <span className='text-[#5528ff] 
              font-bold'>gratuita</span> para acompanhar e medir seus resultados e divulgar seus produtos como afiliado.
            </Text>
          </Box>
          <Box
            width={["360px", "560px"]}
            height={["360px", "560px"]}
            position={"relative"}
            marginTop={["40px", 0]}
          >
            <Image
              src={"/home-hero-banner.webp"}
              alt={"Promogate Redes e Lojas"}
              fill
            />
          </Box>
        </Grid>
        <Grid
          marginTop={["104px", 0]}
          gridTemplateColumns={["1fr", "1fr 1fr"]}
        >
          <Box>
            <Box
              width={["360px", "400px"]}
              height={"280px"}
              position={"relative"}
              margin={"0 auto"}
            >
              <Image
                src='/all_data.svg'
                alt='Painel administrativo com todos os dados'
                fill
              />
            </Box>
            <Heading
              fontSize={"2rem"}
              fontFamily={montserrat.style.fontFamily}
              marginTop={["32px", "56px"]}
              color={"#2b2b2b"}
            >
              Saiba o que mais converte
            </Heading>
            <Text
              fontWeight={"normal"}
              width={{ xl: "72%" }}
              marginTop={["32px", "40px"]}
              fontFamily={openSans.style.fontFamily}
              fontSize={"21px"}
            >
              Obtenha uma visão geral rápida do seu programa de afiliados a qualquer momento ou aproveite nossos
              filtros poderosos e compare diferentes tipos de  conversões.
            </Text>
          </Box>
          <Box>
            <Box
              width={["360px", "400px"]}
              height={"280px"}
              position={"relative"}
              margin={["56px 0 0", "0 auto"]}
            >
              <Image
                src='/social_share.svg'
                alt='Painel administrativo com todos os dados'
                fill
              />
            </Box>
            <Heading
              fontSize={"2rem"}
              fontFamily={montserrat.style.fontFamily}
              marginTop={["32px", "56px"]}
              color={"#2b2b2b"}
            >
              Divulgue sua loja
            </Heading>
            <Text
              fontWeight={"normal"}
              width={{ xl: "72%" }}
              marginTop={["32px", "40px"]}
              fontFamily={openSans.style.fontFamily}
              fontSize={"21px"}
            >
              Aproveite todo o potencial de suas redes sociais e compartilhe sua loja e seus produtos cadastrados. Tenha um maior
              alcance e mais conversões, diretamente do seu painel administrativo.
            </Text>
          </Box>
        </Grid>
        <Flex
          paddingRight={{ xl: "320px" }}
          flexDirection={"column"}
          gap={{ xl: "32px" }}
          color={"#2b2b2b"}
          marginTop={["72px", "144px"]}
        >
          <Text
            fontSize={"2xl"}
            textTransform={"uppercase"}
            letterSpacing={"widest"}
            fontWeight={"light"}
            fontFamily={montserrat.style.fontFamily}
          >
            NÃO SOMOS UMA REDE
          </Text>
          <Heading
            as='h1'
            fontSize={["3rem", "3rem", "5rem"]}
            fontFamily={montserrat.style.fontFamily}
          >
            Receba <Text as={"span"} color={"#5528FF"}>100%</Text> da sua comissão.
          </Heading>
          <Text
            fontFamily={openSans.style.fontFamily}
            fontSize={"21px"}
            width={{ xl: "80%" }}
          >
            Somos uma plataforma de gestão com painel administrativo e um site individual, gratuitos, para você
            divulgar suas ofertas e promoções. além de oferecer as melhores ferramentas de marketing do mercado pra
            você alavancar seu alcance e suas vendas como afiliado
          </Text>
        </Flex>
        <Box
          margin={["104px 0"]}
          textAlign={["center"]}
        >
          <Heading
            fontSize={["2rem"]}
            fontFamily={montserrat.style.fontFamily}
            marginTop={["56px"]}
            color={"#2b2b2b"}
          >
            Confira aqui exemplos de sites
          </Heading>
          <Grid
            margin={{ xl: "2rem 0" }}
            justifyContent={"center"
            }>
            <GridItem
              display={"grid"}
              justifyContent={"center"}
              gap={["24px"]}
            >
              <Box
                rounded={"full"}
                position={"relative"}
                height={"180px"}
                width={"180px"}
                boxShadow={["2xl"]}
                overflow={"hidden"}
                margin={["40px auto", "0 auto"]}
              >
                <Image src='/achei-barato.webp' alt='Loja Promogate' fill />
              </Box>
              <Button
                as={Link}
                href={"/achei-barato"}
                target='_blank'
                maxWidth={"max-content"}
                backgroundColor={"#5528FF"}
                _hover={{ backgroundColor: "#5528FF" }}
                color={"white"}
                rightIcon={<FiExternalLink />}
              >
                Visite uma Loja Parceira
              </Button>
            </GridItem>
          </Grid>
        </Box>
      </Box>
      <HomeFooter />
    </>
  );
}