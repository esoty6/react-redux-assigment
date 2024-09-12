import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User, UserApi } from 'types/user.type';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.org' }),
  endpoints: (builder) => ({
    getAllUsers: builder.query<User[], void>({
      query: () => `/users`,
      transformResponse: (response: UserApi[]) => {
        response.map((user) => {
          user.firstName = user.firstname;
          user.lastName = user.lastname;
          return user;
        });
        return response;
      },
    }),
  }),
});
