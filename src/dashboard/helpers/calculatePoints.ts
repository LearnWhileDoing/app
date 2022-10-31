import UserData from "~/core/models/UserData";

const calculatePoints = (userData: UserData) =>
  Object.keys(userData.completed.courses).length * 20 +
  userData.completed.certificates.length * 10 +
  userData.completed.challenges.length * 3 +
  userData.completed.quizzesCorrect.length * 3 +
  userData.completed.quizzes.length * 2 +
  userData.completed.pages.length;

export default calculatePoints;
