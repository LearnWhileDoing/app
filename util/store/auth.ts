import { Firebase } from "@util/types";
import store from ".";
import { UserData } from "@util/store/userData";

export class Auth {
  provider: Firebase.GoogleAuthProvider;

  constructor() {
    this.provider = new store.firebase.auth.GoogleAuthProvider();

    store.firebase.auth().onAuthStateChanged((user) => {
      if (!store.userData$.value) {
        !user ? store.userData$.next(null) : UserData.new(user.uid);
      }
    });
  }

  private static async createUserDoc(uid: string, name: string) {
    await store.firebase
      .firestore()
      .doc("users/" + uid)
      .set(
        {
          name,
          points: 0,
          current: {},
          completed: {},
        },
        { merge: true }
      );
  }

  async signIn() {
    const { user, additionalUserInfo } = await store.firebase.auth().signInWithPopup(this.provider);
    if (additionalUserInfo.isNewUser) await Auth.createUserDoc(user.uid, user.displayName);
    UserData.new(user.uid);
  }
}
