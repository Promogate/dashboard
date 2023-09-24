export function getSubdomain(): { store: string; } | undefined | null {
  if (typeof window !== "undefined") {
    const { host } = window.location;
    const isDev = host.includes("localhost");
    const splitHost = host.split(".");
    if ((!isDev && splitHost.length === 3) || (isDev && splitHost.length === 2)) {
      let store = splitHost[0];
      if (store === "www") return null;
      return {
        store
      };
    }
  }
}