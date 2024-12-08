import { defineStore } from "pinia";
import { AxiosError } from "axios";

import authApi from "@/api/auth";
import { setItem } from "@/helpers/persistanceStorage";
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
    async [AuthActions.register](credentials: UserType) {
      return new Promise((resolve, reject) => {
        mutations[AuthMutations.registerStart](this);

        authApi
          .register(credentials)
          .then((response) => {
            const user = response?.data?.data?.user ?? null;

            mutations[AuthMutations.registerSuccess](this, user);

            setItem("accessToken", user.token);

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

    async [AuthActions.login](credentials: UserType) {
      return new Promise((resolve, reject) => {
        mutations[AuthMutations.loginStart](this);

        authApi
          .login(credentials)
          .then((response) => {
            const user = response?.data?.data?.user ?? null;

            mutations[AuthMutations.loginSuccess](this, user);

            setItem("accessToken", user.token);

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
  },
});
