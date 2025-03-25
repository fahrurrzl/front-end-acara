import AppShell from "@/components/commons/AppShell/AppShell";
import Provider from "@/Provider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <Provider session={session}>
      <AppShell>
        <Component {...pageProps} />
      </AppShell>
    </Provider>
  );
}
