import { ReactNode } from "react";

type AnalyticsRootProps = {
  children: ReactNode
}

export function AnalyticsRoot({ children }: AnalyticsRootProps) {
  return (
    <section className="my-4">
      {children}
    </section>
  );
}