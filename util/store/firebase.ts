export const firebaseConfig = {
  apiKey: "AIzaSyD_NRIyfqcUMee5rzsEGlTY37ho-piHo1g",
  authDomain: "learnwhiledoing-app.firebaseapp.com",
  projectId: "learnwhiledoing-app",
  storageBucket: "learnwhiledoing-app.appspot.com",
  messagingSenderId: "650841452528",
  appId: "1:650841452528:web:8c950411145411db98b735",
  measurementId: "G-C24QYB9LV9",
};

export const loadFirebase = () =>
  Promise.all([
    import("firebase/app").then((v) => v.default),
    import("firebase/analytics"),
    import("firebase/firestore"),
    import("firebase/auth"),
    import("rxfire/firestore"),
  ]).then(([firebase]) => {
    let app: import("firebase/app").default.app.App;
    if (firebase.apps.length == 0 || firebase.apps[0] == null) {
      app = firebase.initializeApp(firebaseConfig);
      app.firestore().enablePersistence();
    } else app = firebase.apps[0];

    firebase.analytics();

    return { firebase, app };
  });
