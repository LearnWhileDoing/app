import { default as _fetchCourseCertificates } from "~/api/functions/fetchCourseCertificates";
import { default as _fetchCourseIndex } from "~/api/functions/fetchCourseIndex";
import { default as _fetchCourses } from "~/api/functions/fetchCourses";
import { default as _fetchFromGitHub } from "~/api/functions/fetchFromGitHub";
import { default as _fetchTags } from "~/api/functions/fetchTags";

import Certificate from "~/core/models/Certificate";
import Course from "~/core/models/Course";
import CourseIndex from "~/core/models/CourseIndex";

namespace APIService {
  export const GITHUB_CONTENT_URL =
    "https://chroline-literate-space-dollop-rqwjqjvj94cpv97-3000.preview.app.github.dev/";

  const _fetch = async <T>(path: string) => fetch("/api/" + path).then(v => v.json() as unknown as T);

  export const fetchFromGitHub = (filename: string) =>
    process.browser ? _fetch<string>(`fromGitHub?filename=` + filename) : _fetchFromGitHub(filename);

  export const fetchCourses = () =>
    process.browser ? _fetch<Record<string, Omit<Course, "certificates">>>(`courses`) : _fetchCourses();
  export const fetchTags = () => (process.browser ? _fetch<Record<string, string>>(`tags`) : _fetchTags());

  export const fetchCourseCertificates = (id: string) => {
    return process.browser
      ? _fetch<Record<string, Certificate>>(`courseCertificates?id=` + "hi")
      : _fetchCourseCertificates(id);
  };
  export const fetchCourseIndex = (id: string) =>
    process.browser ? _fetch<CourseIndex>(`courseIndex?id=` + id) : _fetchCourseIndex(id);
}

export default APIService;
