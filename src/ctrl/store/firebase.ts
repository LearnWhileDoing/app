import { BehaviorSubject } from "rxjs";

import Firebase from "~/core/models/Firebase";
import firebaseConfig from "~/core/vendor/firebaseConfig";

namespace FirebaseStore {
  export const firebase = new BehaviorSubject<Firebase.Default>(undefined);
  export const app = new BehaviorSubject<Firebase.App>(undefined);

  export function init() {
    return Promise.all([
      import("firebase/app").then(v => v.default),
      import("firebase/analytics"),
      import("firebase/firestore"),
      import("firebase/auth"),
      import("rxfire/firestore"),
    ]).then(([_firebase]) => {
      let _app: import("firebase/app").default.app.App;
      if (_firebase.apps.length == 0 || _firebase.apps[0] == null) {
        _app = _firebase.initializeApp(firebaseConfig);
      } else _app = _firebase.apps[0];

      _firebase.analytics();

      firebase.next(_firebase);
      app.next(_app);
    });
  }
}

export default FirebaseStore;
