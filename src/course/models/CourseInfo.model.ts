import { MDXRemoteSerializeResult } from "next-mdx-remote";

import CourseIndex from "~/core/models/CourseIndex";

export default interface CourseInfoModel {
  rawPage: MDXRemoteSerializeResult;
  index: CourseIndex;
}
