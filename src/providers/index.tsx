"use client";
import { ReactNode } from "react";

import BottomBlur from "~/components/bottom-blur";
import ScrollProgress from "~/components/scroll-progress";
import { TooltipProvider } from "~/components/ui/tooltip";
import TopLoader from "~/components/ui/top-loader";
import LenisProvider from "./lenis";
import ReactQueryProvider from "./react-query";
import { Toaster } from "~/components/ui/sonner";

const RootProviders = ({ children }: { children: ReactNode }) => {
  return (
    <LenisProvider>
      <ReactQueryProvider>
        <TooltipProvider>
          <ScrollProgress />
          <TopLoader />
          {children}
          <BottomBlur />
          <Toaster />
        </TooltipProvider>
      </ReactQueryProvider>
    </LenisProvider>
  );
};

export default RootProviders;
