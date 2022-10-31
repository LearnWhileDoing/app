import { useRef } from "react";

import isDeepEqual from "fast-deep-equal";
import { useObservable } from "react-use";
import { doc } from "rxfire/firestore";
import { BehaviorSubject, Subscription } from "rxjs";
import { filter } from "rxjs/operators";

import UserData from "~/core/models/UserData";

import FirebaseStore from "~/ctrl/store/firebase";

namespace UserStore {
  export const id$ = new BehaviorSubject<string>(undefined);
  export const data$ = new BehaviorSubject<UserData>(undefined);

  let docSubscription: Subscription;

  export async function init() {
    id$.pipe(filter(id => id !== undefined)).subscribe(id => {
      docSubscription?.unsubscribe();

      if (id) {
        docSubscription = doc(FirebaseStore.app.value.firestore().doc(`users/${id}`)).subscribe(snapshot => {
          data$.next(snapshot.data() as UserData);
        });
      } else {
        data$.next(null);
      }
    });
  }
}

export default UserStore;

export function useUserData() {
  const data = useObservable(UserStore.data$, UserStore.data$.value);
  const dataRef = useRef(UserStore.data$.value);
  if (!isDeepEqual(data, dataRef)) {
    dataRef.current = data;
  }
  return dataRef.current;
}

export function useUserId() {
  const id = useObservable(UserStore.id$, UserStore.id$.value);
  const idRef = useRef(UserStore.id$.value);
  if (!isDeepEqual(id, idRef)) {
    idRef.current = id;
  }
  return idRef.current;
}
