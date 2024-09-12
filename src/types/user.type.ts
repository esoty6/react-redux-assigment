export type User = {
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
};

export type UserApi = User & {
  firstname: string;
  lastname: string;
};
