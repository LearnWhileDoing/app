import { BehaviorSubject, Subscription } from "rxjs";
import { doc } from "rxfire/firestore";
import store from "@util/store/index";

export class UserData {
  name: BehaviorSubject<string> = new BehaviorSubject(undefined);

  points: BehaviorSubject<number> = new BehaviorSubject(undefined);

  current: BehaviorSubject<{ [k: string]: string[] }> = new BehaviorSubject(undefined);
  completed: BehaviorSubject<string[]> = new BehaviorSubject(undefined);

  userDoc$?: Subscription;

  private constructor(private userId: string) {
    if (userId != undefined) {
      this.userDoc$ = doc(store.firebase.firestore().doc(`users/${userId}`)).subscribe((snapshot) => {
        const data = snapshot.data();
        this.name.next(data.name);
        this.points.next(data.points);
        this.current.next(data.current);
        this.completed.next(data.completed);
      });
    }
  }

  static new(userId: string) {
    store.userData$.value?.unsubscribe();
    store.userData$.next(new UserData(userId));
  }

  private unsubscribe() {
    this.userDoc$?.unsubscribe();
  }
}
