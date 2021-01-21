import React from "react";
import { GetServerSideProps } from "next";
import { fetchFromDatabase } from "@util/store/database";
import store from "@util/store";
import fetchTOC from "@util/api/fetchTOC";
import WithTOC from "@components/templates/WithTOC";
import { CourseTOC } from "@util/types/courseTOC";

const Content: React.FC<{
  id: string;
  name: string;
  toc: CourseTOC;
}> = ({ id, name, toc }) => {
  return <WithTOC id={id} toc={toc}></WithTOC>;
};

export default Content;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params.id as string;

  const projects = await fetchFromDatabase("projects");
  const basicModules = await fetchFromDatabase("basic-modules");
  const courses = { ...projects, ...basicModules } as typeof store.database.projects;
  const course = courses[id];

  const toc = await fetchTOC(id);

  return {
    props: {
      id,
      ...course,
      toc,
    },
  };
};
