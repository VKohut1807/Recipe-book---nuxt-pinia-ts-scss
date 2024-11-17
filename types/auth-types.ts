import type { ExtendedUserType } from "@/types/user-types";

export type AuthTypes = {
  isSubmitting: boolean;
  isLoading: boolean;
  currentUser: ExtendedUserType | null;
  validationErrors: object | null;
  isLoggedIn: boolean | null;
};
