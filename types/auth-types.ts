import type { ExtendedUserType } from "@/types/user-types";

export type AuthTypes = {
  isSubmitting: boolean;
  isLoading: boolean;
  currentUser: ExtendedUserType | null;
  validationErrors: object | null;
  isLoggedIn: boolean | null;
};

export type AuthResponse = {
  statusCode: number;
  message: string;
  data: {
    errors?: Record<string, string>;
    user?: ExtendedUserType;
  };
};
