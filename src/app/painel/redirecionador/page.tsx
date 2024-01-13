"use client";

import { RedirectorsList } from "@/components/redirectors-list";
import { Button, NoResourcesWarning, PageHeader } from "@/components";
import { CreateRedirectorForm } from "@/components/forms";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";

export default function Page() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <div className="w-full flex justify-between items-center">
          <PageHeader>Redirecionadores</PageHeader>
          <div className="flex items-center gap-4">
            <Button variant={"outline"} className="flex items-center gap-2 trasition-all duration-500 ease-in-out" onClick={() => { }}>
              {/* {query.isRefetching && <PulseLoader color="#2a2a2a" size={4} />} */}
              Atualizar redirecionadores
            </Button>
            <DialogTrigger asChild>
              <Button variant={"default"} className="bg-[#5528ff] text-white">
                Adicionar redirecionador
              </Button>
            </DialogTrigger>
          </div>
        </div>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Adicionar novo redirecionador
            </DialogTitle>
          </DialogHeader>
          <CreateRedirectorForm setOpen={setOpen} />
        </DialogContent>
      </Dialog>
      <RedirectorsList />
    </>
  );
}