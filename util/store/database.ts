import Tag from "../types/tag";
import Course from "@util/types/course";
import * as yaml from "yaml";

export interface Database {
  tags: { popular: string[]; list: { [k: string]: Tag } };
  basicModules: { [k: string]: Course };
  projects: { [k: string]: Course };
  authors: { [k: string]: string };
}

export async function fetchFromDatabase(file: string) {
  const response = await fetch(`https://raw.githubusercontent.com/LearnWhileDoing/database/main/${file}.yaml`);
  return yaml.parse(await response.text());
}

export async function loadDatabase(): Promise<Database> {
  const tags = await fetchFromDatabase("tags");
  const basicModules = await fetchFromDatabase("basic-modules");
  const projects = await fetchFromDatabase("projects");
  const authors = await fetchFromDatabase("authors");

  return {
    tags,
    basicModules,
    projects,
    authors,
  };
}
