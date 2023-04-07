import apiSlice from "../api/apiSlice";
import { userLoggedIn } from "./authSlice";

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: `/register`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const { data, meta } = result || {};
          const { accessToken, user } = data || {};

          if (accessToken && user && meta.response?.status === 201) {
            //set in the localstorage
            const stringifiedData = JSON.stringify({ accessToken, user });
            localStorage.setItem("auth", stringifiedData);

            dispatch(userLoggedIn({ accessToken, user }));
          }
        } catch (err) {}
      },
    }),
    studentLogin: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const { data, meta } = result || {};
          const { accessToken, user } = data || {};

          if (
            accessToken &&
            user &&
            meta.response?.status === 200 &&
            user?.role === "student"
          ) {
            //set in the localstorage
            const stringifiedData = JSON.stringify({ accessToken, user });
            localStorage.setItem("auth", stringifiedData);

            dispatch(userLoggedIn({ accessToken, user }));
          }
        } catch (err) {}
      },
    }),
    adminLogin: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const { data, meta } = result || {};
          const { accessToken, user } = data || {};

          if (
            accessToken &&
            user &&
            meta.response?.status === 200 &&
            user?.role === "admin"
          ) {
            //set in the localstorage
            const stringifiedData = JSON.stringify({ accessToken, user });
            localStorage.setItem("auth", stringifiedData);

            dispatch(userLoggedIn({ accessToken, user }));
          }
        } catch (err) {}
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useStudentLoginMutation,
  useAdminLoginMutation,
} = authApi;
export default authApi;
