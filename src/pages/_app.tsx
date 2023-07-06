import "@client/styles/globals.css";
import type { AppProps } from "next/app";
import "@client/library/firebase";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { useEffect } from "react";
import { initOpenTelemetry } from "@client/library/opentelemetry/telemetry";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    initOpenTelemetry();
  }, []);

  return (
    <MantineProvider withNormalizeCSS>
      <Notifications />
      <Component {...pageProps} />
    </MantineProvider>
  );
}
