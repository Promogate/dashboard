"use client";

import { AuthContextProvider } from "@/application/contexts";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";

export const queryClient = new QueryClient();

export function Providers({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <AuthContextProvider>
          {children}
        </AuthContextProvider>
      </RecoilRoot>
    </QueryClientProvider>
  );
}