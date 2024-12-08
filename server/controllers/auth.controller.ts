import { register } from "@/server/services/auth.service";
import { login } from "@/server/services/auth.service";

import type { UserType } from "@/types/user-types";
import type { AuthResponse } from "@/types/auth-types";

export const registerUser = async (body: { user: UserType }) => {
  const { username, email, password } = body.user;

  const response: AuthResponse = await register({ username, email, password });
  return response;
};

export const loginUser = async (body: { user: UserType }) => {
  const { email, password } = body.user;

  const response: AuthResponse = await login({ email, password });
  return response;
};
