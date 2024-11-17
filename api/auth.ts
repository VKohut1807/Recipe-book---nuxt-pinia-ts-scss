import axios from "@/api/index";
import type { UserType } from "@/types/user-types";

const register = (credentials: UserType) => {
  return axios.post("/api/user/register", { user: credentials });
};

export default {
  register,
};
