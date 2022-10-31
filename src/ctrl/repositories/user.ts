import UserData from "~/core/models/UserData";

import FirebaseStore from "~/ctrl/store/firebase";

namespace UserRepository {
  export async function createUserDoc(uid: string) {
    const doc = FirebaseStore.app.value.firestore().doc("users/" + uid);
    if (await doc.get().then(doc => doc.exists)) return;
    await doc.set(
      {
        current: {},
        completed: {
          courses: {},
          quizzes: [],
          quizzesCorrect: [],
          challenges: [],
          pages: [],
          certificates: [],
        },
      } as UserData,
      { merge: true }
    );
  }

  export async function update(userId: string, data: Record<any, any>) {
    await FirebaseStore.app.value.firestore().doc(`users/${userId}`).update(data);
  }
}

export default UserRepository;
