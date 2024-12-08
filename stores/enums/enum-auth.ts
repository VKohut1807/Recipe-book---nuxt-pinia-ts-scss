export enum AuthGetters {
  currentUser = "[auth] currentUser",
  isLoggedIn = "[auth] isLoggedIn",
  isAnonymous = "[auth] isAnonymous",
}

export enum AuthMutations {
  registerStart = "[auth] register Start",
  registerSuccess = "[auth] register Success",
  registerFailure = "[auth] register Failure",

  loginStart = "[auth] login Start",
  loginSuccess = "[auth] login Success",
  loginFailure = "[auth] login Failure",

  droppingErrors = "[auth] dropping Errors",
}

export enum AuthActions {
  register = "[auth] register",
  login = "[auth] login",
  droppingErrors = "[auth] dropping Errors",
}
