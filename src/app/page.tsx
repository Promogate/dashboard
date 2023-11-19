type PageProps = {
  params: {
    isLogged: string | undefined;
  };
};

export default function Page({ params }: PageProps) {

  return (
    <section className="grid grid-cols-2 h-screen justify-center">
      <div className="h-screen bg-[#5528FF] grid place-content-center">
        <div className="max-w-[400px] text-white grid gap-4">
          <h1 className="text-2xl uppercase font-semibold">
            Controle todos seus links de afiliado que você compartilha.
          </h1>
          <p className="font-thin">
            A Promogate faz o tracking e gerencia seus links de maneira incrivelmente fácil. Você pode ganhar ainda mais, sem precisar adicionar mais trabalho.
          </p>
        </div>
      </div>
      <div></div>
    </section>
  );
}