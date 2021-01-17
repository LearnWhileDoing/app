import {combineLatest, from, Observable} from "rxjs";
import {map}                             from "rxjs/operators";

const firebaseConfig = {
  apiKey: "AIzaSyD_NRIyfqcUMee5rzsEGlTY37ho-piHo1g",
  authDomain: "learnwhiledoing-app.firebaseapp.com",
  projectId: "learnwhiledoing-app",
  storageBucket: "learnwhiledoing-app.appspot.com",
  messagingSenderId: "650841452528",
  appId: "1:650841452528:web:8c950411145411db98b735",
  measurementId: "G-C24QYB9LV9"
};

export const loadFirebase = () => {
  const app$: Observable<any> = from(import("firebase/app")).pipe(map(v => v.default));
  const firestore$: Observable<any> = from(import("firebase/firestore"));
  const rxfire$: Observable<any> = from(import("rxfire/firestore"));
  return combineLatest([app$, firestore$, rxfire$])
    .pipe(
      map(([firebase, firestore, rxfire]) => {
        let app;
        if (firebase.apps.length == 0 || firebase.apps[0] == null) {
          app = firebase.initializeApp(firebaseConfig);
          const settings = {timestampsInSnapshots: true};
          app.firestore().settings(settings);
          app.firestore().enablePersistence();
        } else app = firebase.apps[0];

        return app;
      })
    );
};
