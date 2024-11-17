export enum AuthGetters {
  currentUser = "[auth] currentUser",
  isLoggedIn = "[auth] isLoggedIn",
  isAnonymous = "[auth] isAnonymous",
}

export enum AuthMutations {
  registerStart = "[auth] register Start",
  registerSuccess = "[auth] register Success",
  registerFailure = "[auth] register Failure",

  droppingErrors = "[auth] dropping Errors",
}

export enum AuthActions {
  register = "[auth] register",
  droppingErrors = "[auth] dropping Errors",
}
