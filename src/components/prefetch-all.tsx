"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

let hasPrefetched = false;

const PrefetchAll = ({ routes }: { routes: string[] }) => {
  const router = useRouter();

  useEffect(() => {
    if (hasPrefetched) return;
    hasPrefetched = true;

    const idle = window.requestIdleCallback ?? ((cb: IdleRequestCallback) => setTimeout(cb, 2000));
    idle(() => routes.forEach((route) => router.prefetch(route)));
  }, [routes, router]);

  return null;
};

export default PrefetchAll;
