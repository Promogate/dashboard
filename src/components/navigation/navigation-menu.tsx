import { GeneralNavigationMenu, SupportNavigationMenu, ToolsNavigationMenu } from "..";

export function NavigationMenu() {
  return (
    <div className="flex-1">
        <GeneralNavigationMenu />
        <ToolsNavigationMenu />
        <SupportNavigationMenu />
      </div>
  );
}