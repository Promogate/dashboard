import { api } from "@/config";
import { RegisterFormProps } from "@/domain/models";
import { setCookie } from "cookies-next";

export async function registerUser (values: RegisterFormProps) {
    const { data } = await api.post<{ token: string }>("/users/create", values);
    setCookie("promogate.token", data.token);
}