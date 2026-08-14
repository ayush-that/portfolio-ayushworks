"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const PrefetchAll = ({ routes }: { routes: string[] }) => {
  const router = useRouter();

  useEffect(() => {
    const idle = window.requestIdleCallback ?? ((cb: IdleRequestCallback) => setTimeout(cb, 2000));
    const handle = idle(() => routes.forEach((route) => router.prefetch(route)));
    return () => window.cancelIdleCallback?.(handle as number);
  }, [routes, router]);

  return null;
};

export default PrefetchAll;
