import { NoResourcesWarning } from "@/components";
import { Content } from "@/components/content";
import { Navigation } from "@/components/navigation";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode; }) {
  return (
    <div className="flex">
      <Navigation.Root>
        <Navigation.Image />
        <Navigation.Menu />
        <Navigation.Footer />
      </Navigation.Root>
      <Content.Root>
        <Content.Topbar />
        <NoResourcesWarning>
          <Content.Container>
            {children}
          </Content.Container>
        </NoResourcesWarning>
      </Content.Root>
    </div>
  );
};