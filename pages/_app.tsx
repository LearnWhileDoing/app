import React, { useState } from "react";

import { ChakraProvider, extendTheme, useColorMode, useColorModePreference } from "@chakra-ui/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { motion } from "framer-motion";
import { AppProps } from "next/app";
import Head from "next/head";
import { Router } from "next/router";
import NProgress from "nprogress";
import "react-medium-image-zoom/dist/styles.css";
import { useAsync } from "react-use";
import { firstValueFrom } from "rxjs";
import { filter } from "rxjs/operators";

import { LoadingView } from "~/core/components/LoadingView";
import "~/core/util/base.css";
import "~/core/util/nprogress.css";
import theme from "~/core/util/theme";

import { BreakpointSpyProvider } from "~/ctrl/providers/breakpointSpy";
import AuthService from "~/ctrl/services/auth";
import UserService from "~/ctrl/services/user";
import DatabaseStore from "~/ctrl/store/database";
import FirebaseStore from "~/ctrl/store/firebase";
import UserStore from "~/ctrl/store/user";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

dayjs.extend(relativeTime);

// noinspection JSUnusedGlobalSymbols
export default function App(props: AppProps) {
  const [loadingDesc, setLoadingDesc] = useState("Loading...");
  const appConfig = useAsync(async () => {
    setLoadingDesc("Initializing database...");
    await DatabaseStore.init();
    await FirebaseStore.init();
    await UserStore.init();

    setLoadingDesc("Authenticating...");
    await AuthService.handleRedirectAuth();
    AuthService.listenToAuthChanges();

    setLoadingDesc("Loading user data...");
    await firstValueFrom(UserStore.data$.pipe(filter(d => d !== undefined)));
    UserService.watchForCertificates();
  }, []);

  return (
    <BreakpointSpyProvider>
      <Head>
        <title>LearnWhileDoing</title>

        <meta name={"viewport"} content={"width=device-width, initial-scale=1.0"} />

        <meta name={"apple-mobile-web-app-title"} content={"LWD"} />
        <meta name={"apple-mobile-web-app-capable"} content={"yes"} />
        <link rel="apple-touch-icon" href={"/apple-icon.png"} />

        <link rel={"manifest"} href={"/manifest.json"} />
        <link rel={"icon"} href={"/favicon.png"} />
        <meta name={"theme-color"} content={"#4255BD"} />
      </Head>
      <ChakraProvider resetCSS theme={extendTheme(theme)}>
        {appConfig.loading ? (
          <LoadingView desc={loadingDesc} />
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ width: "100%", height: "100%" }}>
            <props.Component {...props.pageProps} />
          </motion.div>
        )}
      </ChakraProvider>
    </BreakpointSpyProvider>
  );
}
