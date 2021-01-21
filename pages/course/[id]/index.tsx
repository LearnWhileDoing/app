import React from "react";
import { Button } from "@components/atoms";
import { GitHub } from "react-feather";
import { fetchFromDatabase } from "@util/store/database";
import { GetServerSideProps, GetStaticPaths } from "next";
import store from "@util/store";
import fetchTOC from "@util/api/fetchTOC";
import fetchCertificates from "@util/api/fetchCertificates";
import { style, theme } from "@util/theme";
import { useWindowSize } from "react-use";
import fetchPage from "@util/api/fetchPage";
import { MarkdownRenderer } from "@components/molecules";
import styled from "@emotion/styled";
import { InfoSidebar } from "@components/molecules/InfoSidebar";

const Icons = {
  Start: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
        clipRule="evenodd"
      />
    </svg>
  ),
  GitHub: ({ className }) => <GitHub className={className} />,
};

const _PageHeader = styled.div(
  style.merge(
    style.background({
      color: "white",
    }),
    style.layout({
      display: "flex",
    }),
    style.boxAlignment({
      alignItems: "center",
      justifyContent: "center",
    }),
    style.flexbox({
      direction: "column",
    }),
    style.border({
      style: "solid",
      width: 1,
      color: theme.color.grey["200"],
    }),
    style.spacing({
      padding: theme.spacing["12"],
    })
  )
);

const _Btns = styled.div(
  style.merge(
    style.layout({
      display: "flex",
    }),
    style.sizing({
      width: "100%",
    }),
    style.flexbox({
      direction: "row",
    }),
    {
      [`@media(max-width: ${theme.breakpoint.sm})`]: {
        flexDirection: "row",
      },
    }
  )
);

const _StartBtn = styled(Button)(
  style.merge(
    {
      marginRight: theme.spacing["2"],
      marginBottom: 0,
      width: "100%",
    },
    {
      [`@media(max-width: ${theme.breakpoint.sm})`]: {
        marginRight: 0,
        marginBottom: theme.spacing["2"],
      },
    }
  )
);

const _GitHubBtn = styled(Button)({
  flexShrink: 0,
});

const Course: React.FC<{
  id: string;
  name: string;
  authors: string[];
  tags: string[];
  sections: number;
  certificates: number;
  readme: string;
}> = ({ id, name, sections, certificates, readme }) => {
  const { width } = useWindowSize();

  const isXL = width >= 1280;
  const isSM = width <= 640;

  const content = (
    <div
      css={{
        paddingTop: theme.spacing["10"],
        paddingBottom: theme.spacing["12"],
        paddingRight: theme.spacing["6"],
      }}
    >
      <MarkdownRenderer markdown={readme} />
    </div>
  );

  const heading = (
    <div className={"flex mb-6 items-center"}>
      <img className={"w-16 mr-4"} src={`https://raw.githubusercontent.com/LearnWhileDoing/${id}/main/icon.png`} />
      <h1 className={"font-bold text-3xl"}>{name}</h1>
    </div>
  );

  const btns = (
    <_Btns>
      <_StartBtn
        value={"Start course"}
        color={"green"}
        offsetLeft={false}
        leading={Icons.Start}
        href={`/course/${id}/content`}
      />
      <_GitHubBtn
        value={"View on GitHub"}
        color={"grey"}
        offsetLeft={!isSM}
        leading={Icons.GitHub}
        href={`https://github.com/LearnWhileDoing/${id}`}
      />
    </_Btns>
  );

  const sidebar = <InfoSidebar sections={sections} certificates={certificates} />;

  return (
    <div className={`w-full min-h-full overflow-y-scroll bg-gray-100`}>
      <_PageHeader>
        <div
          css={style.merge(
            style.sizing({
              maxWidth: "60rem",
              width: "100%",
            }),
            style.background({
              color: "white",
            }),
            style.boxAlignment({
              alignItems: "center",
            })
          )}
        >
          {heading}
          {btns}
        </div>

        {!isXL && sidebar}
      </_PageHeader>
      <div
        css={{
          display: "flex",
          justifyContent: "center",
          paddingLeft: theme.spacing["12"],
          paddingRight: theme.spacing["12"],
        }}
      >
        <div
          css={style.merge(
            style.layout({
              display: "flex",
            }),
            style.sizing({
              maxWidth: "60rem",
            }),
            !isXL &&
              style.flexbox({
                direction: "column-reverse",
              })
          )}
        >
          {content}
          {isXL && <div className={"xl:flex w-full xl:w-72 xl:pt-0 flex-shrink-0"}>{sidebar}</div>}
        </div>
      </div>
    </div>
  );
};

export default Course;

export const getStaticProps: GetServerSideProps = async (context) => {
  const id = context.params.id as string;

  const projects = await fetchFromDatabase("projects");
  const basicModules = await fetchFromDatabase("basic-modules");
  const courses = { ...projects, ...basicModules } as typeof store.database.projects;
  const course = courses[id];

  const toc = await fetchTOC(id);
  const certificates = await fetchCertificates(id);
  const readme = await fetchPage(id, "README");

  return {
    props: {
      id,
      ...course,
      readme,
      sections: Object.entries(toc).length,
      certificates: Object.entries(certificates || {}).length,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  const projects = await fetchFromDatabase("projects");
  const basicModules = await fetchFromDatabase("basic-modules");
  const courses = { ...projects, ...basicModules } as typeof store.database.projects;

  return {
    paths: Object.keys(courses).map((v) => ({ params: { id: v } })),
    fallback: false,
  };
};
