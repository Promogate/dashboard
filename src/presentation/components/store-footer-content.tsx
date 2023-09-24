import { Box, Grid, Heading, Text } from "@chakra-ui/react";

export function StoreFooterContent() {
  return (
    <Box
      backgroundColor={"#EBEBEB"}
      padding={["2rem 0"]}
    >
      <Grid
        maxWidth={["1170px"]}
        margin={["0 1rem", "0 1rem", "0 auto"]}
        gap={["2rem"]}
      >
        <Heading
          fontSize={["2rem"]}
        >
          O que são e como aproveitar cupons de desconto
        </Heading>
        <Text
          fontSize={["1rem"]}
        >
          Os cupons de desconto são uma estratégia amplamente utilizada pelos anunciantes como uma forma de atrair e
          incentivar os clientes a realizar uma compra. Eles são oferecidos como uma forma de reduzir o preço de um
          produto ou serviço, oferecendo um desconto sobre o valor original.
        </Text>
        <Text
          fontSize={["1rem"]}
        >
          Os anunciantes utilizam os cupons de desconto com o intuito de alcançar diversos objetivos. Eles podem ser
          usados para impulsionar as vendas, aumentar a visibilidade da marca, conquistar novos clientes, incentivar a
          fidelidade dos clientes existentes e até mesmo escoar estoques de produtos.
        </Text>
        <Text
          fontSize={["1rem"]}
        >
          Todas as ofertas, cupons e produtos promovidos pelo site, são oferecidos pelas lojas anunciantes através dos 
          seus programas de parceria/afiliados, que remunera os afiliados (nós) através de comissões pelas compras 
          qualificadas efetuadas.
        </Text>
        <Heading
          fontSize={["1.5rem"]}
        >
          Validade
        </Heading>
        <Text
          fontSize={["1rem"]}
        >
          A duração média dos cupons de desconto pode variar. Alguns cupons têm uma validade de curto prazo, geralmente de
          alguns dias a algumas semanas, para criar um senso de urgência e incentivar os clientes a agirem rapidamente.
          Outros cupons podem ter uma validade mais longa, como meses ou até mesmo um ano, dependendo da estratégia do
          anunciante.
        </Text>
        <Heading
          fontSize={["1.5rem"]}
        >
          Porcentagem
        </Heading>
        <Text
          fontSize={["1rem"]}
        >
          A porcentagem média de desconto aplicada nos cupons pode variar amplamente, dependendo do setor, produto ou
          serviço em questão. Em geral, os descontos podem variar de 5% a 80% ou mais. No entanto, é importante observar
          que a porcentagem de desconto não é fixa e pode variar de acordo com a loja ou produto oferecido.
        </Text>
        <Heading
          fontSize={["1.5rem"]}
        >
          Principais Benefícios
        </Heading>
        <Text
          fontSize={["1rem"]}
        >
          Os benefícios que os clientes podem obter através dos cupons de desconto são diversos. Primeiramente, eles têm a
          oportunidade de adquirir produtos ou serviços com um preço reduzido, o que pode gerar economia significativa para
          o cliente. Além disso, os cupons também podem permitir que os clientes experimentem novos produtos ou serviços
          a um custo mais baixo, incentivando a descoberta de novas marcas ou produtos.
        </Text>
        <Text
          fontSize={["1rem"]}
        >
          Os cupons de desconto também criam um senso de gratificação para os clientes, oferecendo a sensação de obter um
          bom negócio ou vantagem exclusiva. Isso visa aumentar a satisfação do cliente e incentivar a fidelidade à marca.
        </Text>
        <Text
          fontSize={["1rem"]}
        >
          Outro benefício é que os cupons de desconto podem ser compartilhados entre os clientes, permitindo que eles
          recomendem produtos ou serviços a seus amigos, familiares e redes sociais. Isso pode levar a um aumento no
          alcance da marca e na aquisição de novos clientes.
        </Text>
        <Text
          fontSize={["1rem"]}
        >
          No geral, os cupons de desconto desempenham um papel importante no mercado, beneficiando tanto os anunciantes
          quanto os clientes. Os anunciantes podem impulsionar as vendas e a visibilidade da marca, enquanto os clientes
          têm a oportunidade de economizar dinheiro e experimentar produtos ou serviços com preços mais acessíveis.
        </Text>
        <Heading
          fontSize={["2rem"]}
        >
          Existem vários tipos de cupons de desconto, incluindo:
        </Heading>
        <Text
          fontSize={["1rem"]}
        >
          <span className='font-bold'>Porcentagem de desconto:</span> Nesse tipo de cupom, é oferecido um desconto em 
          porcentagem sobre o valor total da compra. Por exemplo, um cupom de 20% de desconto proporcionará uma redução 
          de 20% no preço dos produtos selecionados.
        </Text>
        <Text
          fontSize={["1rem"]}
        >
          <span className='font-bold'>Valor fixo de desconto:</span> Esses cupons oferecem um desconto de um valor 
          específico em moeda, independentemente do valor total da compra. Por exemplo, um cupom de R$50 de desconto 
          permitirá que o consumidor reduza R$50 do preço final.
        </Text>
        <Text
          fontSize={["1rem"]}
        >
          <span className='font-bold'>Frete grátis:</span> Esse tipo de cupom oferece a isenção das taxas de envio ou 
          entrega. É uma opção popular, pois os clientes não precisam pagar pela entrega de seus produtos.
        </Text>
        <Text
          fontSize={["1rem"]}
        >
          <span className='font-bold'>Compre um, ganhe outro:</span> Esse tipo de cupom permite que o cliente compre um 
          produto e ganhe outro gratuitamente ou a um preço reduzido. É comumente usado para impulsionar as vendas e 
          incentivar a compra de produtos em maior quantidade.
        </Text>
        <Text
          fontSize={["1rem"]}
        >
          <span className='font-bold'>Cupons de primeira compra:</span> Alguns sites ou empresas oferecem cupons de 
          desconto exclusivos para novos clientes como um incentivo para fazerem sua primeira compra. Esses cupons 
          geralmente são fornecidos em troca de inscrição em boletins informativos ou criação de uma conta no site.
        </Text>
        <Text
          fontSize={["1rem"]}
        >
          <span className='font-bold'>Cupons sazonais ou promocionais:</span> Esses cupons estão disponíveis durante 
          períodos específicos, como feriados, eventos promocionais ou datas comemorativas. Eles podem oferecer 
          descontos especiais ou vantagens exclusivas aos consumidores durante esses períodos.
        </Text>
        <Text
          fontSize={["1rem"]}
        >
          <span className='font-bold'>Cupons de indicação:</span> Algumas empresas oferecem cupons de desconto para 
          incentivar os clientes existentes a indicarem novos clientes. Assim, tanto o indicante quanto o indicado 
          podem obter benefícios.
        </Text>
      </Grid>
    </Box>
  );
}