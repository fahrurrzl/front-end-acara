"use client";

import { HeroUIProvider } from "@heroui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { SessionExtended } from "./types/Auth";
import { ToasterProvider } from "./context/ToasterContext";
import { onErrorHandler } from "./libs/axios/responseHandler";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      throwOnError(error) {
        onErrorHandler(error);
        return false;
      },
    },
    mutations: {
      onError: onErrorHandler,
    },
  },
});

export default function Provider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: SessionExtended;
}) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <HeroUIProvider>
          <ToasterProvider>{children}</ToasterProvider>
        </HeroUIProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
