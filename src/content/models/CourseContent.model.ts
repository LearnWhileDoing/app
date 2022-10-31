import { MDXRemoteSerializeResult } from "next-mdx-remote";

import Certificate from "~/core/models/Certificate";
import CourseIndex from "~/core/models/CourseIndex";

export default interface CourseContentModel {
  index: CourseIndex;
  certificates: Record<string, Certificate>;
  rawPage: MDXRemoteSerializeResult;
}
