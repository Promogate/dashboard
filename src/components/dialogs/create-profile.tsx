"use client";

import { makeUniqueStoreName } from "@/application/utils/makeUniqueStoreName";
import { api } from "@/config";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { PulseLoader } from "react-spinners";
import * as z from "zod";
import { Button } from "..";
import { FormErrorMessage } from "../form-error-message";
import { DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useToast } from "../ui/use-toast";

const schema = z.object({
  storeNameDisplay: z.string(),
});

type CreateProfileInput = {
  storeImage: string;
  storeName: string;
  storeNameDisplay: string;
  userId: string;
}

export function CreateProfileDialog() {
  const { toast } = useToast();
  const [uniqueName, setUniqueName] = useState<string>("");

  const { register, handleSubmit, formState: { errors } } = useForm<CreateProfileInput>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
  });

  const handleCreateProfile = async (values: CreateProfileInput) => {
    await api.post(`/users/${values.userId}/profile/create`, {
      storeImage: values.storeImage,
      storeName: values.storeName,
      storeNameDisplay: values.storeNameDisplay,
      userId: values.userId,
    });
  };

  const mutation = useMutation({
    mutationFn: async (values: CreateProfileInput) => await handleCreateProfile(values),
    onSuccess: () => {
      toast({
        title: "Perfil criado com sucesso!",
        variant: "default"
      });
    },
    onError: (error: any) => {
      toast({
        title: "Ops! algo deu errado",
        description: error.response.data.message,
        variant: "destructive"
      });
    }
  });

  const onSubmit: SubmitHandler<CreateProfileInput> = async (values) => {
    // await mutation.mutateAsync({ ...values, userId: user?.id as string, storeImage: "", storeName: uniqueName });
    console.log({ ...values, userId: "NEED TO RETRIEVE" as string, storeImage: "", storeName: uniqueName });
  };

  const handleUniqueNamePreview = (): string => {
    if (uniqueName.length === 0) return "nome-unico";
    return makeUniqueStoreName(uniqueName);
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          Criar um perfil de loja
        </DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-6 pl-1 pr-4 py-4">
        <fieldset className="flex flex-col gap-2">
          <label htmlFor="storeNameDisplay" className="text-xs text-gray-700">Nome da sua página</label>
          <input className="border border-gray-600 rounded-md py-2 px-2 placeholder:font-light placeholder:text-sm" {...register("storeNameDisplay")} id="storeNameDisplay" placeholder="Promoções e Descontos" />
          <span className="text-sm text-gray-400 font-light">
            Nome que será mostrado para os seus visitantes
          </span>
          {errors.storeNameDisplay && <FormErrorMessage message={errors.storeNameDisplay.message} />}
        </fieldset>
        <fieldset className="flex flex-col gap-2">
          <label htmlFor="storeName" className="text-xs text-gray-700">Nome único</label>
          <input className="border border-gray-600 rounded-md py-2 px-2 placeholder:font-light placeholder:text-sm" id="storeName" placeholder="promocoes-e-descontos" onChange={(e) => setUniqueName(e.target.value)} />
          <span className="text-sm text-gray-400 font-light">
            Seu link será esse: http://{handleUniqueNamePreview()}.promogate.app
          </span>
          {errors.storeName && <FormErrorMessage message={errors.storeName.message} />}
        </fieldset>
        <div className="flex justify-end py-4">
          <Button type="submit" className="bg-[#5528ff] text-white">
            {mutation.isLoading && <PulseLoader color="#fff" size={4} />}
            Criar perfil
          </Button>
        </div>
      </form>
    </DialogContent>
  );
};