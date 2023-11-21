import { AuthForm } from "@/components";
import Image from "next/image";

type PageProps = {
  params: {
    isLogged: string | undefined;
  };
};

export default function Page({ params }: PageProps) {
  return (
    <>
      <section className="grid grid-cols-2 h-screen justify-center">
        <div className="h-screen grid bg-[#5528ff] place-content-center">
          <div className="max-w-[400px] text-white grid gap-4">
            <div className="relative w-[300px] h-[300px]">
              <Image src="undraw_security_re_a2rk.svg" alt="Não autorizado" fill />
            </div>
            <h1 className="text-2xl uppercase font-semibold">
              Sem autorização para acessar a página
            </h1>
            <p className="font-thin">
              Desculpe pelo transtorno. Algumas páginas só podem ser acessada por alguém autenticado na plataforma. Faça o seu login para acessar normalmente.
            </p>
          </div>
        </div>
        <AuthForm />
      </section>
    </>
  );
}