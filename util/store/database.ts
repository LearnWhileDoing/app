import Tag       from "../interfaces/tag";
import Course    from "@util/interfaces/course";
import * as yaml from "yaml";

export interface Database {
  tags: Promise<{ popular: string[], list: { [k: string]: Tag } }>;
  basicModules: Promise<{ [k: string]: Course }>;
  projects: Promise<{ [k: string]: Course }>;
  authors: Promise<{ [k: string]: string }>
}

export async function fetchFromDatabase(file: string) {
  const response = await fetch(`https://raw.githubusercontent.com/LearnWhileDoing/database/main/${file}.yaml`);
  return yaml.parse(await response.text());
}

export function loadDatabase(): Database {
  const tags = fetchFromDatabase("tags");
  const basicModules = fetchFromDatabase("basic-modules");
  const projects = fetchFromDatabase("projects");
  const authors = fetchFromDatabase("authors");

  return {
    tags, basicModules, projects, authors
  };
}
