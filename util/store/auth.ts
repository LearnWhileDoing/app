import { Firebase } from "@util/types";
import store from ".";
import { UserData } from "@util/store/userData";

export class Auth {
  provider: Firebase.GoogleAuthProvider;

  constructor() {
    this.provider = new store.firebase.auth.GoogleAuthProvider();
    this.init();
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
    await store.firebase.auth().signInWithRedirect(this.provider);
  }

  async init() {
    const redirectResult = await store.firebase.auth().getRedirectResult();

    if (!!redirectResult.user) {
      const { user, additionalUserInfo } = redirectResult;
      if (additionalUserInfo.isNewUser) await Auth.createUserDoc(user.uid, user.displayName);
    }

    store.firebase.auth().onAuthStateChanged((user) => {
      if (!store.userData$.value) {
        !user ? store.userData$.next(null) : UserData.new(user.uid);
      }
    });
  }
}
