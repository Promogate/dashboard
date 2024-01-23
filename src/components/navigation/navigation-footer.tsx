import { SignOutButtom } from "./sign-out-button";

export function NavigationFooter() {
  return (
    <div className="w-full h-12 border-t border-gray-200 border-opacity-75 flex items-center px-4">
      <SignOutButtom />
    </div>
  );
}