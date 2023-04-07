import apiSlice from "../api/apiSlice";

const videosApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVideos: builder.query({
      query: () => ({
        url: "/videos",
      }),
    }),
    getVideo: builder.query({
      query: (id) => ({
        url: `/videos/${id}`,
      }),
    }),
    addVideo: builder.mutation({
      query: (data) => ({
        url: "/videos",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const { data, meta } = result || {};
          if (data.id && meta?.response?.status === 201) {
            //pesimistic update
            dispatch(
              apiSlice.util.updateQueryData("getVideos", undefined, (draft) => {
                draft.push(data);
              })
            );
          }
        } catch (error) {}
      },
    }),
    updateVideo: builder.mutation({
      query: ({ id, data }) => ({
        url: `/videos/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(
        { id, data: userGivenData },
        { queryFulfilled, dispatch }
      ) {
        try {
          const result = await queryFulfilled;
          const { data, meta } = result || {};
          if (data.id && meta.response?.status === 200) {
            //update whole videos array
            dispatch(
              apiSlice.util.updateQueryData("getVideos", undefined, (draft) => {
                const editableDraft = draft.find(
                  (video) => Number(video.id) === Number(data.id)
                );
                editableDraft.title = data.title;
                editableDraft.description = data.description;
                editableDraft.url = data.url;
                editableDraft.views = data.views;
                editableDraft.duration = data.duration;
                editableDraft.createdAt = data.createdAt;
              })
            );

            //update video of that id
            dispatch(
              apiSlice.util.updateQueryData("getVideo", id, (draft) => {
                draft.title = data.title;
                draft.description = data.description;
                draft.url = data.url;
                draft.views = data.views;
                draft.duration = data.duration;
                draft.createdAt = data.createdAt;
              })
            );
            const dataToPassForUpdate = {
              video_title: data.title,
            };
            // update all quizzes

            //update all assignments
            const assignments = await dispatch(
              apiSlice.endpoints.getAssignmentWithVideoId.initiate(id)
            ).unwrap();
            // check if title are not same
            if (
              assignments?.length > 0 &&
              assignments[0].video_title !== data.title
            ) {
              assignments.forEach((assignment) => {
                dispatch(
                  apiSlice.endpoints.updateAssignmentVideoTitle.initiate({
                    id: assignment.id,
                    data: dataToPassForUpdate,
                  })
                );
              });
            }

            // update all quizzes title
            const quizzes = await dispatch(
              apiSlice.endpoints.getQuizzesWithVideoId.initiate(id)
            ).unwrap();
            // check if title are not same
            if (quizzes?.length > 0 && quizzes[0].video_title !== data.title) {
              quizzes.forEach((quiz) =>
                dispatch(
                  apiSlice.endpoints.updateQuizVideoTitle.initiate({
                    id: quiz.id,
                    data: dataToPassForUpdate,
                  })
                )
              );
            }
          }
        } catch (error) {}
      },
    }),
    deleteVideo: builder.mutation({
      query: (id) => ({
        url: `/videos/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          const { meta } = result || {};
          if (meta.response?.status === 200) {
            dispatch(
              apiSlice.util.updateQueryData("getVideos", undefined, (draft) => {
                return draft.filter(
                  (video) => Number(video.id) !== Number(arg)
                );
              })
            );

            //delete all
            // have to delete quizzes only->(quiz will delete them quizMark),

            //quizzes
            // get quizzes that have this video id
            const quizzes = await dispatch(
              apiSlice.endpoints.getQuizzesWithVideoId.initiate(arg)
            ).unwrap();

            if (quizzes?.length > 0) {
              //delete each quiz that have video id
              quizzes.forEach((quiz) => {
                dispatch(
                  apiSlice.endpoints.deleteQuiz.initiate({
                    id: quiz.id,
                    video_id: arg,
                  })
                );
              });
            }

            // have to delete assignments only->(assignment will delete assignmentMarks),
            //assignments
            const assignments = await dispatch(
              apiSlice.endpoints.getAssignmentWithVideoId.initiate(arg)
            ).unwrap();

            if (assignments?.length > 0) {
              // delete all assignments
              assignments.forEach((assignment) => {
                dispatch(
                  apiSlice.endpoints.deleteAssignment.initiate(assignment.id)
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
  useGetVideosQuery,
  useGetVideoQuery,
  useAddVideoMutation,
  useUpdateVideoMutation,
  useDeleteVideoMutation,
} = videosApi;
export default videosApi;
