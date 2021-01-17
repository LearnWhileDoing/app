import React from "react";
import store from "@util/store";
import { PromiseBuilder, ReactiveBuilder } from "@components/molecules/builders";
import { CourseItem, PuffLoader } from "@components/atoms";
import Course from "@util/interfaces/course";
import styled from "@emotion/styled";
import { style, theme } from "@util/theme";

const _LoadingView = () => {
  return (
    <div className="flex flex-col justify-center items-center h-36 w-full">
      <PuffLoader color={"#3b82f6"} size={"24"} />
    </div>
  );
};

const CurrentCourses = () => {
  return (
    <div className={`p-12 w-full`}>
      <p className={`m-0 mb-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider`}>CURRENT COURSES</p>
      <PromiseBuilder
        promise={
          Promise.all([store.value.database.projects, store.value.database.basicModules]) as Promise<
            { [k: string]: Course }[]
          >
        }
        builder={({ hasData, data }) => {
          if (hasData) {
            return (
              <ReactiveBuilder
                subject={store.value.userData.currentCourses}
                builder={({ hasData, data }) => {
                  if (hasData)
                    return (
                      <div
                        css={`
                          display: grid;
                          grid-template-columns: repeat(3, 1fr);
                          grid-auto-rows: 1fr;
                          grid-gap: 1rem;
                          gap: 1rem;
                        `}
                      />
                    );
                  else
                    return (
                      <div className={"w-full p-3 flex items-center justify-center"}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className={"w-8 text-blue-900"}
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-7.536 5.879a1 1 0 001.415 0 3 3 0 014.242 0 1 1 0 001.415-1.415 5 5 0 00-7.072 0 1 1 0 000 1.415z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <p className={"ml-3 text-blue-900"}>You have no current courses</p>
                      </div>
                    );
                }}
              />
            );
          } else return <_LoadingView />;
        }}
      />
    </div>
  );
};

const Projects = () => {
  return (
    <PromiseBuilder
      promise={store.value.database.projects}
      builder={({ hasData, data }) => {
        console.log(data);
        return (
          <table className={`min-w-full border-collapse`}>
            <thead className={"border-solid border border-l-0 border-r-0 border-gray-200"}>
              <tr className={"bg-gray-50"}>
                <th
                  scope="col"
                  className={"pl-12 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"}
                >
                  PROJECT
                </th>
                <th scope="col" className={"py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"}>
                  TAGS
                </th>
              </tr>
            </thead>
            <tbody className={"divide-y divide-gray-200"}>
              {hasData && Object.entries(data).map((v) => <CourseItem id={v[0]} name={v[1].name} tags={v[1].tags} />)}
            </tbody>
          </table>
        );
      }}
    />
  );
};

const BasicModules = () => {
  return (
    <PromiseBuilder
      promise={store.value.database.basicModules}
      builder={({ hasData, data }) => {
        console.log(data);
        return (
          <table className={`min-w-full border-collapse`}>
            <thead className={"border-solid border border-l-0 border-r-0 border-gray-200"}>
              <tr className={"bg-gray-50"}>
                <th
                  scope="col"
                  className={"pl-12 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"}
                >
                  BASIC MODULES
                </th>
                <th scope="col" className={"py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"}>
                  TAGS
                </th>
              </tr>
            </thead>
            <tbody className={"divide-y divide-gray-200"}>
              {hasData && Object.entries(data).map((v) => <CourseItem id={v[0]} name={v[1].name} tags={v[1].tags} />)}
            </tbody>
          </table>
        );
      }}
    />
  );
};

const _TableWrapper = styled.div`
  ${"" /*tw\`flex flex-col -my-2 py-2 align-middle inline-block w-full\`*/}
  min-width: 60rem;
`;

style.merge(
  style.layout({
    display: "flex",
  }),
  style.sizing({
    width: "100%",
    minWidth: "60rem",
  }),
  style.flexbox({
    direction: "column",
  }),
  style.spacing({
    margin: `-${theme.spacing["2"]}`,
    padding: theme.spacing["2"],
  })
);

const Index = () => {
  return (
    <div
      css={{
        width: "100%",
      }}
    >
      <CurrentCourses />
      <div
        css={{
          width: "100%",
          overflowX: "scroll",
          overflowY: "hidden",
        }}
      >
        <_TableWrapper>
          <Projects />
          <BasicModules />
        </_TableWrapper>
      </div>
    </div>
  );
};

export default Index;
