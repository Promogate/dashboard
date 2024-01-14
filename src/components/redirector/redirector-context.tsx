import { Redirector } from "@/domain/@types";
import { createContext, useContext } from "react";

const RedirectorContext = createContext<{ redirector: Redirector } | null>(null);

export function useRedirectorContext() {
  const context = useContext(RedirectorContext);
  if (!context) {
    throw new Error("Redirector.* component must be rendered as child of Redirector component");
  }
  return context;
}

export default RedirectorContext;