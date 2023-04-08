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
      providesTags: ["getStudents"],
    }),
  }),
});

export const { useGetUsersQuery, useGetStudentsQuery } = usersApi;
export default usersApi;
