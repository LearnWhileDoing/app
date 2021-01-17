export class Auth {
  currentUser: firebase.default.User;

  constructor(public app: firebase.default.app.App) {
    this.currentUser = app.auth().currentUser;
  }
}
