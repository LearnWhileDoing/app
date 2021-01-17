import "@fontsource/inter";
import "../tailwind.base.css";

import React from "react";
import Drawer from "@components/organisms/Drawer";
import { BoxLoader, DrawerItem, PuffLoader } from "@components/atoms";
import store, { initStore } from "@util/store";
import { PromiseBuilder } from "@components/molecules/builders";
import { KnowledgePoints } from "@components/atoms/KnowledgePoints";
import { theme } from "@util/theme";
import { AppProps } from "next/app";
import Head from "next/head";
import WithDrawer from "@components/templates/WithDrawer";
import Tag from "@util/interfaces/tag";
import { useRouter } from "next/router";

const _LoadingView = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full bg-gray-100">
      <p className="text-xl text-gray-500 mb-6">Loading...</p>
      <BoxLoader color={"#3b82f6"} size={24} />
    </div>
  );
};

const _Icons = {
  Home: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
      />
    </svg>
  ),
  CompletedCourses: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
      />
    </svg>
  ),
  Certificates: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
      />
    </svg>
  ),
  Folder: ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      className={className}
      css={{ width: theme.spacing["6"], strokeWidth: 2.2 }}
    >
      <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" fill="currentColor" />
    </svg>
  ),
};

const _Tags: React.FC<{ data: { popular: string[]; list: { [p: string]: Tag } } }> = ({ data }) => (
  <>
    {data.popular.map((t) => {
      const tag = data.list[t];
      return (
        <DrawerItem
          active={false}
          color={tag.color}
          leading={({ className }) => (
            <_Icons.Folder className={className} css={{ color: theme.color[tag.color]["700"] }} />
          )}
          text={"#" + t}
          key={t}
        />
      );
    })}
  </>
);

const _Drawer = () => {
  const { asPath } = useRouter();

  return (
    <Drawer>
      <KnowledgePoints points={0} />
      <DrawerItem
        active={asPath === "/"}
        leading={({ className }) => <_Icons.Home className={className} />}
        text="Home"
        href={"/"}
      />
      <DrawerItem
        active={asPath === "/completed"}
        leading={({ className }) => <_Icons.CompletedCourses className={className} />}
        text="Completed Courses"
      />
      <DrawerItem
        active={asPath === "/certificates"}
        leading={({ className }) => <_Icons.Certificates className={className} />}
        text="Certificates"
      />
      <div className={`pt-6 pb-2`}>
        <p className={`m-0 text-left text-sm font-medium text-gray-500 uppercase tracking-wider`}>POPULAR TAGS</p>
      </div>
      <PromiseBuilder
        promise={store.value.database.tags}
        builder={({ hasData, data }) =>
          hasData ? (
            <_Tags data={data} />
          ) : (
            <div
              css={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                paddingTop: theme.spacing["4"],
                paddingBottom: theme.spacing["4"],
              }}
            >
              <PuffLoader color={theme.color.blue["500"]} size={theme.spacing["16"]} />
            </div>
          )
        }
      />
    </Drawer>
  );
};

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>LearnWhileDoing</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <PromiseBuilder
        promise={process.browser ? (initStore() as any) : new Promise(() => undefined)}
        builder={({ hasData }) =>
          hasData ? (
            <WithDrawer drawer={<_Drawer />}>
              <Component {...pageProps} />
            </WithDrawer>
          ) : (
            <_LoadingView />
          )
        }
      />
    </>
  );
};

export default App;
