import { useState } from "react";

export default function useIsClient() {
  const [isClient] = useState(() => typeof window !== "undefined");
  return isClient;
}
