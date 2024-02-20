import { Button, PageHeader } from "@/components";
import { LinksTable } from "@/components/links-table";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Page() {
  return (
    <div className="w-full h-full grid grid-cols-1 gap-y-4">
      <div className="w-full flex justify-between items-center">
        <PageHeader>Links Encurtados</PageHeader>
        <div className="flex items-center gap-4">
          <Button variant={"outline"} className="flex items-center gap-2 trasition-all duration-500 ease-in-out">
            {/* {query.isRefetching && <PulseLoader color="#2a2a2a" size={4} />} */}
            Adicionar Grupo
          </Button>
          <Button variant={"default"} className="bg-[#5528ff] text-white">
            Adicionar Link
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-y-1 max-w-[33.3%]">
        <h2 className="uppercase text-xs text-slate-500">Grupos</h2>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Todos os grupos" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="group1">Grupo #1</SelectItem>
              <SelectItem value="group2">Grupo #2</SelectItem>
              <SelectItem value="group3">Grupo #3</SelectItem>
              <SelectItem value="group4">Grupo #4</SelectItem>
              <SelectItem value="group5">Grupo #5</SelectItem>
              <SelectItem value="group6">Grupo #6</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="w-full">
        <LinksTable />
      </div>
    </div>
  );
}