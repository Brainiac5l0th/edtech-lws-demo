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
    addQuiz: builder.mutation({
      query: (data) => ({
        url: "/quizzes",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          const { data, meta } = result;
          if (data.id && meta.response?.status === 201) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getQuizzes",
                undefined,
                (draft) => {
                  draft.push(data);
                }
              )
            );
            //check if there is any quiz mark for this quiz
            const quizMarks = await dispatch(
              apiSlice.endpoints.getQuizMarkWithVideoId.initiate(data?.video_id)
            ).unwrap();
            if (quizMarks?.length > 0) {
              //if there is any quiz mark delete the quiz mark and notify the student
              quizMarks.forEach((quizMark) =>
                dispatch(
                  apiSlice.endpoints.deleteQuizMark.initiate(quizMark.id)
                )
              );
            }
          }
        } catch (error) {}
      },
    }),
    updateQuiz: builder.mutation({
      query: ({ id, data }) => ({
        url: `/quizzes/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const { data, meta } = result;
          if (data.id && meta?.response?.status === 200) {
            //update all query cache
            dispatch(
              apiSlice.util.updateQueryData(
                "getQuizzes",
                undefined,
                (draft) => {
                  const editableDraft = draft.find(
                    (quiz) => Number(quiz.id) === Number(arg.id)
                  );
                  editableDraft.question = data?.question;
                  editableDraft.video_id = data?.video_id;
                  editableDraft.video_title = data?.video_title;
                  editableDraft.options = data?.options;
                }
              )
            );
            //update cache of that assignment
            dispatch(
              apiSlice.util.updateQueryData("getQuiz", arg.id, (draft) => {
                draft.question = data?.question;
                draft.video_id = data?.video_id;
                draft.video_title = data?.video_title;
                draft.options = data?.options;
              })
            );
          }
        } catch (error) {}
      },
    }),
    updateQuizWithOptions: builder.mutation({
      query: ({ id, data }) => ({
        url: `/quizzes/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const { data, meta } = result;
          if (data.id && meta?.response?.status === 200) {
            //update all query cache
            dispatch(
              apiSlice.util.updateQueryData(
                "getQuizzes",
                undefined,
                (draft) => {
                  const editableDraft = draft.find(
                    (quiz) => Number(quiz.id) === Number(arg.id)
                  );
                  editableDraft.question = data?.question;
                  editableDraft.video_id = data?.video_id;
                  editableDraft.video_title = data?.video_title;
                  editableDraft.options = data?.options;
                }
              )
            );
            //update cache of that assignment
            dispatch(
              apiSlice.util.updateQueryData("getQuiz", arg.id, (draft) => {
                draft.question = data?.question;
                draft.video_id = data?.video_id;
                draft.video_title = data?.video_title;
                draft.options = data?.options;
              })
            );

            //get all quiz marks against this data
            const quizMarks = await dispatch(
              apiSlice.endpoints.getQuizMarkWithVideoId.initiate(data?.video_id)
            ).unwrap();

            if (quizMarks?.length > 0) {
              //delete all quizmarks that have this options
              quizMarks.forEach((quizMark) =>
                dispatch(
                  apiSlice.endpoints.deleteQuizMark.initiate(quizMark.id)
                )
              );
            }
          }
        } catch (error) {}
      },
    }),
    updateQuizVideoTitle: builder.mutation({
      query: ({ id, data }) => ({
        url: `/quizzes/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const { data, meta } = result;
          if (data.id && meta?.response?.status === 200) {
            //update all query cache
            dispatch(
              apiSlice.util.updateQueryData(
                "getQuizzes",
                undefined,
                (draft) => {
                  const draftToEdit = draft.find(
                    (quiz) => Number(quiz.id) === Number(arg.id)
                  );
                  draftToEdit.video_id = data.video_id;
                  draftToEdit.video_title = data.video_title;
                }
              )
            );
            dispatch(
              apiSlice.util.updateQueryData("getQuiz", arg.id, (draft) => {
                draft.video_id = data.video_id;
                draft.video_title = data.video_title;
              })
            );

            // update all quizMark that have video_title
            // videoId = data.video_id
            const quizMarks = await dispatch(
              apiSlice.endpoints.getQuizMarkWithVideoId.initiate(data?.video_id)
            ).unwrap();

            if (quizMarks?.length > 0) {
              quizMarks.forEach((quizMark) => {
                dispatch(
                  apiSlice.endpoints.updateQuizMarkVideoTitle.initiate({
                    id: quizMark.id,
                    data: {
                      video_id: data.video_id,
                      video_title: data.video_title,
                    },
                  })
                );
              });
            }
          }
        } catch (error) {}
      },
    }),
    deleteQuiz: builder.mutation({
      query: ({ id, video_id }) => ({
        url: `/quizzes/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          const { meta } = result;
          if (meta.response?.status === 200) {
            //update all quizzes pessimistically
            dispatch(
              apiSlice.util.updateQueryData(
                "getQuizzes",
                undefined,
                (draft) => {
                  return draft.filter(
                    (quiz) => Number(quiz.id) !== Number(arg.id)
                  );
                }
              )
            );

            //find all quizMarks against video id
            const quizMarks = await dispatch(
              apiSlice.endpoints.getQuizMarkWithVideoId.initiate(arg.video_id)
            ).unwrap();
            if (quizMarks?.length > 0) {
              //delete all quizMarks for this videoId and inform the student
              quizMarks.forEach((quizMark) => {
                dispatch(
                  apiSlice.endpoints.deleteQuizMark.initiate({
                    id: quizMark?.id,
                    video_id: arg.video_id,
                  })
                );
              });
            }
          }
        } catch (error) {}
      },
    }),
  }),
});

export const {
  useGetQuizzesQuery,
  useGetQuizQuery,
  useGetQuizzesWithVideoIdQuery,
  useAddQuizMutation,
  useUpdateQuizMutation,
  useUpdateQuizWithOptionsMutation,
  useUpdateQuizVideoTitleMutation,
  useDeleteQuizMutation,
} = quizzesApi;
export default quizzesApi;
