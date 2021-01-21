import "@fontsource/ibm-plex-sans";
import "../tailwind.base.css";

import React from "react";
import { BoxLoader, PuffLoader } from "@components/atoms";
import store, { initStore, ShowWaitingProvider, useShowWaiting } from "@util/store";
import { PromiseBuilder } from "@components/molecules/builders";
import { theme } from "@util/theme";
import { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import NextNprogress from "nextjs-progressbar";
import shouldRedirect from "@util/functions/shouldRedirect";
import { Appbar } from "@components/molecules";

const _Wrapper: React.FC<{ pathname: string }> = ({ pathname, children }) => {
  switch (pathname) {
    case "/course/[id]/content":
      return <>{children}</>;
    case "/":
      return (
        <>
          <Appbar.Nav elevatedAt={1} />
          <div css={{ paddingTop: theme.spacing["20"], height: "100%" }}>{children}</div>
        </>
      );
    default:
      return (
        <>
          <Appbar.Nav />
          <div
            css={{
              paddingTop: theme.spacing["20"],
              height: "100%",
            }}
          >
            {children}
          </div>
        </>
      );
  }
};

const loadingView = (
  <div className="flex flex-col justify-center items-center h-full w-full bg-gray-100">
    <p className="text-xl text-gray-500 mb-6">Loading...</p>
    <BoxLoader color={"#3b82f6"} size={24} />
  </div>
);

const waitingView = (
  <div className="flex flex-col justify-center items-center h-full w-full bg-gray-100 opacity-95 fixed inset-0 z-50">
    <PuffLoader color={"#3b82f6"} size={24} />
  </div>
);

const _Component: React.FC<{ component: JSX.Element }> = ({ component }) => {
  const router = useRouter();
  const [showWaiting] = useShowWaiting();

  return (
    <PromiseBuilder
      promise={!store.firebase ? (initStore() as any) : new Promise(() => undefined)}
      builder={({ hasData }) => {
        if (hasData) {
          const redirect = shouldRedirect(router);
          if (!redirect) {
            return (
              <>
                {showWaiting && waitingView}
                <_Wrapper pathname={router.pathname}>{component}</_Wrapper>
              </>
            );
          }
          router.push(redirect);
        }
        return loadingView;
      }}
    />
  );
};

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>LearnWhileDoing</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <>
        <NextNprogress color={theme.color.indigo["200"]} height={5} />
        <ShowWaitingProvider>
          <_Component component={<Component {...pageProps} />} />
        </ShowWaitingProvider>
      </>
    </>
  );
};

export default App;
