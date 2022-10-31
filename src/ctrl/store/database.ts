import { BehaviorSubject } from "rxjs";

import Course from "~/core/models/Course";
import Database from "~/core/models/Database";
import { mapOf } from "~/core/util/expressions/mapOf";

import APIService from "~/ctrl/services/api";

namespace DatabaseStore {
  export const database$ = new BehaviorSubject<Database>(undefined);

  export async function getCourses() {
    const rawCourses = Object.entries(await APIService.fetchCourses())
        .map(async ([courseId, course]) => [
          courseId,
          { ...course, certificates: {} /* await APIService.fetchCourseCertificates(courseId) */ },
        ]),
      courses = mapOf(...((await Promise.all(rawCourses)) as [string, Course][]));

    const basicModules = {},
      projects = {};

    Object.entries(courses).forEach(([id, course]) => {
      if (course.isProject) projects[id] = course;
      else basicModules[id] = course;
    });

    return { basicModules, projects };
  }

  export async function init() {
    const courseCollection = await getCourses(),
      tags = await APIService.fetchTags();

    const { basicModules, projects } = courseCollection,
      allCourses = { ...basicModules, ...projects };

    const databaseValue = {
      tags,
      basicModules,
      projects,
      allCourses,
    };

    database$.next(databaseValue);

    return databaseValue;
  }
}

export default DatabaseStore;
