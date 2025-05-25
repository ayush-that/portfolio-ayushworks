"use client";
import { ReactNode } from "react";

import ScrollProgress from "~/components/scroll-progress";
import { TooltipProvider } from "~/components/ui/tooltip";
import TopLoader from "~/components/ui/top-loader";
import ReactQueryProvider from "./react-query";
import { Toaster } from "~/components/ui/sonner";
import I18nProvider from "~/components/providers/i18n-provider";

const RootProviders = ({ children }: { children: ReactNode }) => {
  return (
    <I18nProvider>
      <ReactQueryProvider>
        <TooltipProvider>
          <ScrollProgress />
          <TopLoader />
          {children}
          <Toaster />
        </TooltipProvider>
      </ReactQueryProvider>
    </I18nProvider>
  );
};

export default RootProviders;
