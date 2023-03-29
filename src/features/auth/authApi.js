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
    login: builder.mutation({
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

          if (accessToken && user && meta.response?.status === 200) {
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

export const { useRegisterMutation, useLoginMutation } = authApi;
export default authApi;
