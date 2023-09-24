import React from "react";

export function ContentWrapper({ children }: { children: React.ReactNode; }) {
  return (
    <main className="max-w-screen-xl px-4 my-4 h-full mx-auto relative items-center">
      {children}
    </main>
  );
}