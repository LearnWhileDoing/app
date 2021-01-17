async function fetchPage(course: string, page: string) {
  const response = await fetch(`https://raw.githubusercontent.com/LearnWhileDoing/${course}/main/${page}.md`);
  return await response.text();
}

export default fetchPage;
