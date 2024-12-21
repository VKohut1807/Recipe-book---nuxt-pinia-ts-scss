import axios from "@/api/index";
import type { UserType } from "@/types/user-types";

const register = (credentials: UserType) => {
  return axios.post("/api/auth/register", { user: credentials });
};

const login = (credentials: UserType) => {
  return axios.post("/api/auth/login", { user: credentials });
};

const getCurrentUser = () => {
  return axios.get(`/api/auth/user`);
};

export default {
  register,
  login,
  getCurrentUser,
};
