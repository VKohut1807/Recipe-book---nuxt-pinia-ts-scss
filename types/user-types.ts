export type UserType = {
  username?: string | null;
  password: string | null;
  email: string | null;
};

export type ExtendedUserType = UserType & {
  id?: number;
  image?: string;
  token?: string;
  bio?: string;
};
