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
        url: `/quizzes/${id}`,
      }),
    }),
    getQuizzesWithVideoId: builder.query({
      query: (id) => ({
        url: `/quizzes?video_id=${id}`,
      }),
    }),
  }),
});

export const { useGetQuizzesQuery, useGetQuizQuery, useGetQuizzesWithVideoIdQuery } = quizzesApi;
export default quizzesApi;
