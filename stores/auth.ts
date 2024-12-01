import { defineStore } from "pinia";
import { AxiosError } from "axios";

import authApi from "@/api/auth";
import { setItem } from "@/helpers/persistanceStorage";
import {
  AuthGetters,
  AuthMutations,
  AuthActions,
} from "@/stores/enums/enum-auth";

import type { AuthTypes } from "@/types/auth-types";
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
    state.currentUser = payload;
  },
  [AuthMutations.registerFailure]: (
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
            mutations[AuthMutations.registerSuccess](this, response.data.user);

            setItem("accessToken", response.data.user.token);

            resolve(response.data.user);
          })
          .catch((errors: AxiosError<{ errors?: string[] }>) => {
            mutations[AuthMutations.registerFailure](
              this,
              errors?.response?.data?.errors || null
            );

            console.error("ERRORS REGISTER", errors?.response?.data?.errors);
          });
      });
    },

    [AuthActions.droppingErrors](): void {
      mutations[AuthMutations.droppingErrors](this);
    },
  },
});
