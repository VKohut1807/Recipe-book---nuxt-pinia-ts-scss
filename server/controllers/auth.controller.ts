import { register } from "@/server/services/auth.service";

export const registerUser = async (body: {
  user: {
    email: string;
    username: string;
    password: string;
  };
}) => {
  const { email, username, password } = body.user;
  if (!email || !username || !password) {
    console.log("body", body);

    return {
      statusCode: 400,
      message: "Email and password are required",
    };
  }

  try {
    const user = await register(email, username, password);
    return {
      statusCode: 201,
      message: "User registered successfully",
      user: user,
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      message: error.message || "Something went wrong",
    };
  }
};
