import apiSlice from "../api/apiSlice";

const quizMarkApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuizMarks: builder.query({
      query: () => ({
        url: "/quizMark",
      }),
    }),
    getQuizMarkWithStudentId: builder.query({
      query: ({ videoId, student_id }) => ({
        url: `/quizMark?video_id=${videoId}&student_id=${student_id}`,
      }),
    }),
    addQuizMark: builder.mutation({
      query: (data) => ({
        url: `/quizMark`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          const { data, meta } = result;
          const { video_id, student_id } = data || {};
          if (data?.id && meta.response?.status === 201) {
            //pesimistic update to the all Marks query
            dispatch(
              apiSlice.util.updateQueryData(
                "getQuizMarks",
                undefined,
                (draft) => {
                  draft.push(data);
                }
              )
            );
            //pesimistic update to the query with student id and video id
            dispatch(
              apiSlice.util.updateQueryData(
                "getQuizMarkWithStudentId",
                {
                  videoId: video_id,
                  student_id: student_id,
                },
                (draft) => {
                  draft.push(data);
                }
              )
            );
          }
        } catch (error) {}
      },
    }),
  }),
});

export const {
  useGetQuizMarkWithStudentIdQuery,
  useGetQuizMarksQuery,
  useAddQuizMarkMutation,
} = quizMarkApi;
export default quizMarkApi;
