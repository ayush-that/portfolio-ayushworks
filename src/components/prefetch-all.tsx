"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Warms every internal route on load so navigation anywhere on the site is instant,
// not just links currently in the viewport (Next's default). Runs once — the (main)
// layout does not remount across client-side navigations.
const PrefetchAll = ({ routes }: { routes: string[] }) => {
  const router = useRouter();

  useEffect(() => {
    routes.forEach((route) => router.prefetch(route));
  }, [routes, router]);

  return null;
};

export default PrefetchAll;
