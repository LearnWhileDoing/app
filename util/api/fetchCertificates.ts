import * as yaml from "yaml";

async function fetchTOC(course: string) {
  const response = await fetch(`https://raw.githubusercontent.com/LearnWhileDoing/${course}/main/certificates.yaml`);
  return yaml.parse(await response.text());
}

export default fetchTOC;
