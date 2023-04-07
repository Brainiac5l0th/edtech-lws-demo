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
    getQuizMarkWithVideoId: builder.query({
      query: (videoId) => ({
        url: `/quizMark?video_id=${videoId}`,
      }),
      providesTags: ["getQuizMarkWithVideoId"],
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
    updateQuizMarkVideoTitle: builder.mutation({
      query: ({ id, data }) => ({
        url: `/quizMark/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          const { data, meta } = result;
          if (data.id && meta?.response?.status === 200) {
            //update all assignment marks
            dispatch(
              apiSlice.util.updateQueryData(
                "getQuizMarks",
                undefined,
                (draft) => {
                  const draftToEdit = draft.find(
                    (quizMark) => Number(quizMark.id) === Number(arg.id)
                  );
                  draftToEdit.video_title = data.video_title;
                }
              )
            );
          }
        } catch (error) {}
      },
    }),
    deleteQuizMark: builder.mutation({
      query: ({ id, video_id }) => ({
        url: `/quizMark/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["getQuizMarkWithVideoId"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          const { meta } = result;
          if (meta.response?.status === 200) {
            //update cache data
            dispatch(
              apiSlice.util.updateQueryData(
                "getQuizMarks",
                undefined,
                (draft) => {
                  draft.filter(
                    (quizMark) => Number(quizMark.id) !== Number(arg.id)
                  );
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
