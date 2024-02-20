import { Button, PageHeader } from "@/components";

export default function Page() {
  return (
    <div className="w-full h-full">
      <div className="w-full flex justify-between items-center">
        <PageHeader>Contas</PageHeader>
        <div className="flex items-center gap-4">
          <Button variant={"outline"} className="flex items-center gap-2 trasition-all duration-500 ease-in-out">
            {/* {query.isRefetching && <PulseLoader color="#2a2a2a" size={4} />} */}
            Atualizar números
          </Button>
          {/* <DialogTrigger asChild> */}
            <Button variant={"default"} className="bg-[#5528ff] text-white">
              Adicionar número
            </Button>
          {/* </DialogTrigger> */}
        </div>
      </div>
    </div>
  );
}