"use client";

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
        {children}
      </RecoilRoot>
    </QueryClientProvider>
  );
}