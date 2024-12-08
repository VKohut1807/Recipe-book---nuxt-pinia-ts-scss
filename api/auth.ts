import axios from "@/api/index";
import type { UserType } from "@/types/user-types";

const register = (credentials: UserType) => {
  return axios.post("/api/auth/register", { user: credentials });
};

const login = (credentials: UserType) => {
  return axios.post("/api/auth/login", { user: credentials });
};

export default {
  register,
  login,
};
