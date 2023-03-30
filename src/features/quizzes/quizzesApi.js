import apiSlice from "../api/apiSlice";

const quizzesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuizzes: builder.query({
      query: () => ({
        url: "/quizzes",
      }),
    }),
    getQuiz: builder.query({
      query: (id) => ({
        url: `/videos/${id}`,
      }),
    }),
  }),
});

export const { useGetQuizzesQuery, useGetQuizQuery } = quizzesApi;
export default quizzesApi;
