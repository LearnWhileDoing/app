interface CourseTOCSection {
  title: string;
  list: CourseTOC
}

export interface CourseTOC {
  [k: string]: CourseTOCSection
}
