import { filter } from "rxjs/operators";

import toast from "~/core/util/toast";

import UserRepository from "~/ctrl/repositories/user";
import DatabaseStore from "~/ctrl/store/database";
import FirebaseStore from "~/ctrl/store/firebase";
import UserStore from "~/ctrl/store/user";
import PageProgress from "~/ctrl/util/PageProgress";

namespace UserService {
  export const update = (data: Record<any, any>) => UserRepository.update(UserStore.id$.value, data);

  export const startCourse = (courseId: string) =>
    update({
      ["current." + courseId]: {},
    });

  export async function updatePage(courseId: string, slug: string, progress: PageProgress) {
    await update({
      [`current.${courseId}.${slug}`]: progress,
      "completed.pages": [
        ...UserStore.data$.value.completed.pages,
        progress === PageProgress.COMPLETE && `${courseId}/${slug}`,
      ].filter((value: any, index: number, arr: any[]) => arr.indexOf(value) === index && !!value),
    });
  }

  export async function completeQuiz(courseId: string, slug: string, correct: boolean) {
    if (UserStore.data$.value.completed.quizzes.includes(`${courseId}/${slug}`)) return;

    await update({
      "completed.quizzes": [...UserStore.data$.value.completed.quizzes, `${courseId}/${slug}`].filter(
        (value: any, index: number, arr: any[]) => arr.indexOf(value) === index
      ),
      "completed.quizzesCorrect": [
        ...UserStore.data$.value.completed.quizzesCorrect,
        correct && `${courseId}/${slug}`,
      ].filter((value: any, index: number, arr: any[]) => arr.indexOf(value) === index && !!value),
    });
  }

  export async function completeChallenge(courseId: string, slug: string) {
    if (UserStore.data$.value.completed.challenges.includes(`${courseId}/${slug}`)) return;

    await update({
      "completed.challenges": [...UserStore.data$.value.completed.challenges, `${courseId}/${slug}`].filter(
        (value: any, index: number, arr: any[]) => arr.indexOf(value) === index
      ),
    });
  }

  export async function completeCourse(courseId: string) {
    await update({
      "completed.courses": { ...UserStore.data$.value.completed.courses, [courseId]: new Date() },
      ["current." + courseId]: FirebaseStore.firebase.value.firestore.FieldValue.delete(),
    });
  }

  export async function earnCertificate(courseId: string, certificateId: string) {
    const exists = UserStore.data$.value.completed.certificates.includes(`${courseId}/${certificateId}`);
    if (!exists) {
      await update({
        "completed.certificates": [...UserStore.data$.value.completed.certificates, `${courseId}/${certificateId}`],
      });
    }
    return !exists;
  }

  export function watchForCertificates() {
    UserStore.data$.pipe(filter(d => !!d)).subscribe(userData => {
      Object.entries(DatabaseStore.database$.value.allCourses).map(([courseId, course]) =>
        Object.entries(course.certificates).map(([certificateId, certificate]) => {
          const coursesPrereqs = !certificate.prereqs.courses
            ? true
            : certificate.prereqs.courses.filter(prereq => !Object.keys(userData.completed.courses).includes(prereq))
                .length === 0;
          const pagesPrereqs = !certificate.prereqs.pages
            ? true
            : certificate.prereqs.pages.filter(prereq => !userData.completed.pages.includes(prereq)).length === 0;
          const quizzesPrereqs = !certificate.prereqs.quizzes
            ? true
            : certificate.prereqs.quizzes.filter(prereq => !userData.completed.quizzes.includes(prereq)).length === 0;
          const challengesPrereqs = !certificate.prereqs.challenges
            ? true
            : certificate.prereqs.challenges.filter(prereq => !userData.completed.challenges.includes(prereq))
                .length === 0;

          if (coursesPrereqs && pagesPrereqs && quizzesPrereqs && challengesPrereqs) {
            UserService.earnCertificate(courseId, certificateId).then(added => {
              if (added) {
                toast({
                  title: "You earned a certificate!",
                  description: certificate.description,
                  status: "success",
                  isClosable: true,
                });
              }
            });
          }
        })
      );
    });
  }
}

export default UserService;
