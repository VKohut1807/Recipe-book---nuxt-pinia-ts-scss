import { defineStore } from "pinia";
import { AxiosError } from "axios";
import { H3Event, setCookie } from "h3";

import authApi from "@/api/auth";
import {
  AuthGetters,
  AuthMutations,
  AuthActions,
} from "@/stores/enums/enum-auth";

import type { AuthTypes, AuthResponse } from "@/types/auth-types";
import type { UserType, ExtendedUserType } from "@/types/user-types";

const mutations = {
  [AuthMutations.registerStart]: (state: AuthTypes): void => {
    state.isSubmitting = true;
    state.validationErrors = null;
  },
  [AuthMutations.registerSuccess]: (
    state: AuthTypes,
    payload: ExtendedUserType
  ): void => {
    state.isSubmitting = false;
    state.isLoggedIn = true;
    console.log("payload", payload);

    state.currentUser = payload;
  },
  [AuthMutations.registerFailure]: (
    state: AuthTypes,
    payload: AuthTypes["validationErrors"]
  ): void => {
    state.isSubmitting = false;
    state.validationErrors = payload;
  },

  [AuthMutations.loginStart]: (state: AuthTypes): void => {
    state.isSubmitting = true;
    state.validationErrors = null;
  },
  [AuthMutations.loginSuccess]: (
    state: AuthTypes,
    payload: ExtendedUserType
  ): void => {
    state.isSubmitting = false;
    state.isLoggedIn = true;
    state.currentUser = payload;
  },
  [AuthMutations.loginFailure]: (
    state: AuthTypes,
    payload: AuthTypes["validationErrors"]
  ): void => {
    state.isSubmitting = false;
    state.validationErrors = payload;
  },

  [AuthMutations.droppingErrors](state: AuthTypes) {
    state.validationErrors = null;
  },

  [AuthMutations.getCurrentUserStart](state: AuthTypes) {
    state.isLoading = true;
  },
  [AuthMutations.getCurrentUserSuccess](
    state: AuthTypes,
    payload: ExtendedUserType
  ) {
    state.isLoading = false;
    state.isLoggedIn = true;
    state.currentUser = payload;
  },
  [AuthMutations.getCurrentUserFailure](
    state: AuthTypes,
    payload: AuthTypes["validationErrors"]
  ) {
    state.isLoading = false;
    state.isLoggedIn = false;
    state.currentUser = null;
    state.validationErrors = payload;
  },
};

export const useAuthStore = defineStore("auth", {
  state: (): AuthTypes => ({
    isSubmitting: false,
    isLoading: false,
    currentUser: null,
    validationErrors: null,
    isLoggedIn: null,
  }),

  getters: {
    [AuthGetters.currentUser]: (state: AuthTypes) => state.currentUser,
    [AuthGetters.isLoggedIn]: (state: AuthTypes) => Boolean(state.isLoggedIn),
    [AuthGetters.isAnonymous]: (state: AuthTypes) => state.isLoggedIn === false,
  },

  actions: {
    async [AuthActions.register](event: H3Event, credentials: UserType) {
      return new Promise((resolve, reject) => {
        mutations[AuthMutations.registerStart](this);

        authApi
          .register(credentials)
          .then((response) => {
            const user = response?.data?.data?.user ?? null;
            const token = response?.data?.data?.token ?? null;

            mutations[AuthMutations.registerSuccess](this, user);

            if (token) {
              setCookie(event, "auth_token", token, {
                maxAge: 60 * 60 * 24 * 7,
              });
            }

            resolve(user);
          })
          .catch((error: AxiosError<AuthResponse>) => {
            const data = error?.response?.data ?? null;

            mutations[AuthMutations.registerFailure](
              this,
              data?.data?.errors ?? null
            );

            console.error(
              "status:",
              data?.statusCode,
              "message:",
              data?.message ?? null
            );
          });
      });
    },

    async [AuthActions.login](event: H3Event, credentials: UserType) {
      return new Promise((resolve, reject) => {
        mutations[AuthMutations.loginStart](this);

        authApi
          .login(credentials)
          .then((response) => {
            const user = response?.data?.data?.user ?? null;
            const token = response?.data?.data?.token ?? null;

            mutations[AuthMutations.loginSuccess](this, user);

            if (token) {
              setCookie(event, "auth_token", token, {
                maxAge: 60 * 60 * 24 * 7,
              });
            }

            resolve(user);
          })
          .catch((error: AxiosError<AuthResponse>) => {
            const data = error?.response?.data ?? null;

            mutations[AuthMutations.loginFailure](
              this,
              data?.data?.errors ?? null
            );

            console.error(
              "status:",
              data?.statusCode,
              "message:",
              data?.message ?? null
            );
          });
      });
    },

    [AuthActions.droppingErrors](): void {
      mutations[AuthMutations.droppingErrors](this);
    },

    async [AuthActions.getCurrentUser](event: H3Event, credentials: UserType) {
      return new Promise((resolve, reject) => {
        mutations[AuthMutations.getCurrentUserStart](this);

        authApi
          .getCurrentUser()
          .then((response) => {
            const user = response?.data?.data?.user ?? null;

            mutations[AuthMutations.getCurrentUserSuccess](this, user);

            resolve(user);
          })
          .catch((error: AxiosError<AuthResponse>) => {
            const data = error?.response?.data ?? null;

            mutations[AuthMutations.getCurrentUserFailure](
              this,
              data?.data?.errors ?? null
            );

            console.error(
              "status:",
              data?.statusCode,
              "message:",
              data?.message ?? null
            );
          });
      });
    },
  },
});
