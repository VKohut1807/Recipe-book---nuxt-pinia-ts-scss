import { createError } from "h3";
import db from "@/db";
import { registerUserMutation } from "@/db/mutations/register-user";

import type { UserType, ExtendedUserType } from "@/types/user-types";
import type { AuthResponse } from "@/types/auth-types";

export const register = async ({
  username,
  email,
  password,
}: UserType): Promise<AuthResponse> => {
  const errors: Record<string, string> = {};

  if (!username) errors.username = "Username is required";
  if (!email) errors.email = "Email is required";
  if (!password) errors.password = "Password is required";

  if (Object.keys(errors).length > 0) {
    throw createError({
      statusCode: 400,
      message: "Validation error",
      data: { errors },
    }) as AuthResponse;
  }

  const userExists = db
    .prepare("SELECT * FROM users WHERE email = ?")
    .get(email) as UserType;

  if (userExists) {
    throw createError({
      statusCode: 409,
      message: "User with this email already exists",
    }) as AuthResponse;
  }

  try {
    const user: ExtendedUserType = await registerUserMutation({
      username,
      email,
      password,
    });

    return {
      statusCode: 201,
      message: "User registered successfully",
      data: { user },
    } as AuthResponse;
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: error.message || "Something went wrong",
    }) as AuthResponse;
  }
};

export const login = async ({
  email,
  password,
}: UserType): Promise<AuthResponse> => {
  const errors: Record<string, string> = {};

  if (!email) errors.email = "Email is required";
  if (!password) errors.password = "Password is required";

  if (Object.keys(errors).length > 0) {
    throw createError({
      statusCode: 400,
      message: "Validation error",
      data: { errors },
    }) as AuthResponse;
  }

  const userExists = db
    .prepare("SELECT * FROM users WHERE email = ?")
    .get(email) as ExtendedUserType;

  if (!userExists) {
    throw createError({
      statusCode: 404,
      message: "User with this email does not exist",
    }) as AuthResponse;
  }

  if (userExists.password !== password) {
    errors.password = "Password doesn't match";

    throw createError({
      statusCode: 401,
      message: "Invalid password",
      data: { errors },
    }) as AuthResponse;
  }

  try {
    return {
      statusCode: 200,
      message: "Login successful",
      data: {
        user: userExists,
      },
    } as AuthResponse;
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: error.message || "Something went wrong",
    }) as AuthResponse;
  }
};
