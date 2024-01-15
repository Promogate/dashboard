import { GeneralNavigationMenu } from "./general-navigation-menu";
import { SupportNavigationMenu } from "./support-navigation-menu";
import { ToolsNavigationMenu } from "./tools-navigation-menu";

export function NavigationMenu() {
  return (
    <div className="flex-1">
        <GeneralNavigationMenu />
        <ToolsNavigationMenu />
        <SupportNavigationMenu />
      </div>
  );
}