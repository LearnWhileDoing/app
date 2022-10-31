import PageProgress from "~/ctrl/util/PageProgress";

export default interface UserData {
  name: string;
  current: { [k: string]: Record<string, PageProgress> };
  completed: {
    courses: {
      [k: string]: import("firebase").default.firestore.Timestamp;
    };
    quizzes: string[];
    quizzesCorrect: string[];
    challenges: string[];
    pages: string[];
    certificates: string[];
  };
}
