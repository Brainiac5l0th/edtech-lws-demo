import apiSlice from "../api/apiSlice";

const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: `/users`,
      }),
    }),
    getStudents: builder.query({
      query: () => ({
        url: `/users?role=student`,
      }),
    }),
  }),
});

export const { useGetUsersQuery, useGetStudentsQuery } = usersApi;
export default usersApi;
