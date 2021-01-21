import { loadFirebase } from "./firebase";
import { Database, loadDatabase } from "./database";
import { Auth } from "./auth";
import { UserData } from "./userData";
import { Firebase } from "@util/types";
import { BehaviorSubject } from "rxjs";

class Store {
  firebase: Firebase.Default;

  app: Firebase.App;

  database: Database;
  auth: Auth;
  userData$: BehaviorSubject<UserData | null> = new BehaviorSubject<UserData>(undefined);
}

const store = new Store();

export async function initStore() {
  if (!process.browser) return;

  const { firebase, app } = await loadFirebase();
  store.firebase = firebase;
  store.app = app;

  store.database = await loadDatabase();
  store.auth = new Auth();

  return store;
}

export default store;

export { ShowWaitingProvider, useShowWaiting } from "./showLoading";
