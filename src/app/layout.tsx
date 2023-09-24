import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ChakraProviders } from "./ChakraProviders";
import QueryProvider from "./QueryProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Promogate",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <ChakraProviders>
        <QueryProvider>
          <body className={inter.className}>{children}</body>
        </QueryProvider>
      </ChakraProviders>
    </html>
  );
}
