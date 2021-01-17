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
import MarkdownRenderer from "@components/molecules/MarkdownRenderer";

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

const _DescItem1: React.FC<{ icon: JSX.Element; color: string }> = ({ icon, color, children }) => (
  <div className={"flex my-1"}>
    <div className={`text-${color}-600`}>{icon}</div>
    <span className={`ml-2 text-lg text-${color}-800`}>{children}</span>
  </div>
);

const _DescItem2: React.FC<{ text: string }> = ({ text, children }) => (
  <div>
    <span className={`text-lg text-grey-500`}>{text}</span>
    {children}
  </div>
);

const Course: React.FC<{
  id: string;
  name: string;
  authors: string[];
  tags: string[];
  sections: number;
  certificates: number;
  description: string;
}> = ({ id, name, sections, certificates, description }) => {
  const { width } = useWindowSize();

  const isXL = width >= 1280;
  const isSM = width <= 640;

  const content = (
    <div
      css={{
        paddingTop: theme.spacing["10"],
        paddingBottom: theme.spacing["12"],
      }}
    >
      <MarkdownRenderer markdown={description} />
    </div>
  );

  return (
    <div className={`flex flex-col xl:flex-row w-full min-h-full px-12`}>
      <div className={"xl:flex-grow lg:mr-12"}>
        <div
          css={style.merge(
            style.spacing({
              paddingTop: theme.spacing["12"],
              paddingBottom: theme.spacing["6"],
            }),
            style.border({
              style: "solid",
              width: 0,
              color: theme.color.grey["200"],
            }),
            {
              [`@media(min-width: ${theme.breakpoint.xl})`]: style.border({
                widthBottom: 1,
              }),
              [`@media(min-width: ${theme.breakpoint.lg})`]: style.merge(
                style.boxAlignment({
                  alignItems: "center",
                }),
                style.spacing({
                  paddingTop: theme.spacing["12"],
                  paddingBottom: theme.spacing["12"],
                })
              ),
            }
          )}
        >
          <div className={"flex mb-6 items-center"}>
            <img
              className={"w-16 mr-4"}
              src={`https://raw.githubusercontent.com/LearnWhileDoing/${id}/main/icon.png`}
            />
            <h1 className={"font-bold text-3xl"}>{name}</h1>
          </div>
          <div className={"flex w-full flex-col sm:flex-row"}>
            <Button
              value={"Start course"}
              color={"green"}
              className={"mb-2 sm:mr-2 sm:mb-0 w-full"}
              offsetLeft={!isSM}
              leading={Icons.Start}
            />
            <Button
              value={"View on GitHub"}
              color={"grey"}
              className={"flex-shrink-0"}
              offsetLeft={!isSM}
              leading={Icons.GitHub}
              href={`https://github.com/LearnWhileDoing/${id}`}
            />
          </div>
        </div>
        {isXL && content}
      </div>
      <div className={"xl:flex w-full xl:w-72 pt-4 xl:pt-0 flex-shrink-0"}>
        <div
          css={style.merge(
            style.border({
              style: "solid",
              width: 0,
              widthLeft: 1,
              color: theme.color.grey["200"],
            }),
            style.spacing({
              paddingBottom: theme.spacing["6"],
            }),
            {
              [`@media(min-width: ${theme.breakpoint.xl}),`]: style.merge(
                style.spacing({
                  marginTop: theme.spacing["12"],
                  marginBottom: theme.spacing["12"],
                  paddingBottom: 0,
                  paddingLeft: theme.spacing["12"],
                })
              ),
              [`@media(min-width: ${theme.breakpoint.xl}), (max-width: ${theme.breakpoint.md})`]: style.merge(
                style.flexbox({
                  grow: 1,
                })
              ),
              [`@media(max-width: ${theme.breakpoint.xl})`]: style.border({ widthLeft: 0, widthBottom: 1 }),
              [`@media(max-width: ${theme.breakpoint.xl}) and (min-width: ${theme.breakpoint.md})`]: style.merge(
                style.spacing({ marginBottom: theme.spacing["6"] }),
                style.layout({ display: "flex" })
              ),
            }
          )}
        >
          <div
            css={style.merge(
              style.border({
                style: "solid",
                width: 0,
                widthBottom: 1,
                color: theme.color.grey["200"],
              }),
              style.spacing({
                paddingBottom: theme.spacing["6"],
              }),
              {
                [`@media(max-width: ${theme.breakpoint.xl}) and (min-width: ${theme.breakpoint.md})`]: style.merge(
                  style.sizing({
                    width: "100%",
                  }),
                  style.spacing({
                    paddingRight: theme.spacing["6"],
                  }),
                  style.border({
                    widthRight: 1,
                    widthBottom: 0,
                  })
                ),
              }
            )}
          >
            <_DescItem1
              color={"green"}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className={"w-6"}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              }
            >
              Free forever
            </_DescItem1>
            <_DescItem1
              color={"grey"}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className={"w-6"}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  />
                </svg>
              }
            >
              {sections} sections
            </_DescItem1>
            <_DescItem1
              color={"grey"}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className={"w-6"}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              }
            >
              {certificates} certificates
            </_DescItem1>
          </div>
          <div
            css={style.merge({
              [`@media(min-width: ${theme.breakpoint.xl}), (max-width: ${theme.breakpoint.md})`]: style.spacing({
                paddingTop: theme.spacing["6"],
              }),
              [`@media(max-width: ${theme.breakpoint.xl}) and (min-width: ${theme.breakpoint.md})`]: style.merge(
                style.sizing({
                  width: "100%",
                }),
                style.spacing({
                  paddingLeft: theme.spacing["6"],
                })
              ),
            })}
          >
            <_DescItem2 text={"Authors"}></_DescItem2>
          </div>
        </div>

        {!isXL && content}
      </div>
    </div>
  );
};

export const getStaticProps: GetServerSideProps = async (context) => {
  const id = context.params.id as string;

  const projects = await fetchFromDatabase("projects");
  const basicModules = await fetchFromDatabase("basic-modules");
  const courses = { ...projects, ...basicModules } as typeof store.value.database.projects;
  const course = courses[id];

  const toc = await fetchTOC(id);
  const certificates = await fetchCertificates(id);
  const description = await fetchPage(id, "README");

  return {
    props: {
      id,
      ...course,
      description,
      sections: Object.entries(toc).length,
      certificates: Object.entries(certificates || {}).length,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  const projects = await fetchFromDatabase("projects");
  const basicModules = await fetchFromDatabase("basic-modules");
  const courses = { ...projects, ...basicModules } as typeof store.value.database.projects;

  return {
    paths: Object.keys(courses).map((v) => ({ params: { id: v } })),
    fallback: false,
  };
};

export default Course;
