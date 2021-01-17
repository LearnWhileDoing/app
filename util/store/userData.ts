import {BehaviorSubject, Subscription} from "rxjs";
import firebase                        from "firebase";
import {doc}                           from "rxfire/firestore";

export class UserData {
  name: BehaviorSubject<string> = new BehaviorSubject(undefined);
  username: BehaviorSubject<string> = new BehaviorSubject(undefined);

  currentCourses: BehaviorSubject<string[]> = new BehaviorSubject(undefined);
  completedCourses: BehaviorSubject<string[]> = new BehaviorSubject(undefined);

  userDoc$?: Subscription;

  constructor(private userId: string, private firestore: firebase.firestore.Firestore) {
    console.log(userId);
    if (userId != undefined) this.update(userId);
  }

  update(userId: string) {
    this.unsubscribe();
    this.userDoc$ = doc(this.firestore.doc(`users/${userId}`)).subscribe(snapshot => {
      const data = snapshot.data();
      this.name.next(data.name);
      this.username.next(data.username);
      this.currentCourses.next(data.currentCourses);
      this.completedCourses.next(data.completedCourses);
    });
  }

  unsubscribe() {
    this.userDoc$?.unsubscribe();
  }
}
