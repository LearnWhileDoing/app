import {loadFirebase}           from "./firebase";
import firebase                 from "firebase";
import {Database, loadDatabase} from "./database";
import {Auth}                   from "./auth";
import {BehaviorSubject}        from "rxjs";
import {UserData}               from "./userData";

let store: BehaviorSubject<{
  app: firebase.app.App,
  database: Database,
  auth: Auth,
  userData: UserData
}> = new BehaviorSubject(undefined);

export async function initStore() {
  console.log(1);
  const app = await loadFirebase().toPromise();
  console.log(2);
  const database = loadDatabase();
  console.log(3);
  const auth = new Auth(app);
  console.log(4);
  const userData = new UserData(auth.currentUser?.uid, app.firestore());
  console.log(5);
  store.next({
    app, database, auth, userData
  });
  console.log(6);
  return store;
}

export default store;
