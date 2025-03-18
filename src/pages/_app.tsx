import Provider from "@/Provider";
import "@/styles/globals.css";
import { cn } from "@/utils/cn";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <Provider session={session}>
      <main className={cn(inter.className)}>
        <Component {...pageProps} />
      </main>
    </Provider>
  );
}
