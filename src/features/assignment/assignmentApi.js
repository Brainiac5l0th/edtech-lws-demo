import apiSlice from "../api/apiSlice";

const assignmentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAssignments: builder.query({
      query: () => ({
        url: "/assignments",
      }),
    }),
    getAssignment: builder.query({
      query: (id) => ({
        url: `/assignments/${id}`,
      }),
    }),
    getAssignmentWithVideoId: builder.query({
      query: (id) => ({
        url: `/assignments?video_id=${id}`,
      }),
    }),
    addAssignment: builder.mutation({
      query: (data) => ({
        url: "/assignments",
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
              apiSlice.util.updateQueryData(
                "getAssignments",
                undefined,
                (draft) => {
                  draft.push(data);
                }
              )
            );
          }
        } catch (error) {}
      },
    }),
    updateAssignmentVideoTitle: builder.mutation({
      query: ({ id, data }) => ({
        url: `assignments/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          const { data, meta } = result;
          if (data?.id && meta?.response?.status === 200) {
            //update assignments cache data
            dispatch(
              apiSlice.util.updateQueryData(
                "getAssignments",
                undefined,
                (draft) => {
                  const editableDraft = draft.find(
                    (assignment) => Number(assignment.id) === Number(arg.id)
                  );
                  editableDraft.video_title = data.video_title;
                }
              )
            );
            //update cache of that assignment
            dispatch(
              apiSlice.util.updateQueryData(
                "getAssignment",
                arg.id,
                (draft) => {
                  const editableDraft = draft.find(
                    (assignment) => Number(assignment.id) === Number(arg.id)
                  );
                  editableDraft.video_title = data.video_title;
                }
              )
            );
          }
        } catch (error) {}
      },
    }),
    updateAssignment: builder.mutation({
      query: ({ id, data }) => ({
        url: `assignments/${id}`,
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
              apiSlice.util.updateQueryData(
                "getAssignments",
                undefined,
                (draft) => {
                  const editableDraft = draft.find(
                    (video) => Number(video.id) === Number(data.id)
                  );
                  editableDraft.title = data.title;
                  editableDraft.totalMark = data.totalMark;
                }
              )
            );

            //update video of that id
            dispatch(
              apiSlice.util.updateQueryData("getAssignment", id, (draft) => {
                draft.title = data.title;
                draft.totalMark = data.totalMark;
              })
            );
            const dataToPass = {
              title: data.title,
              totalMark: data.totalMark,
            };

            //also update all assignment marks
            const assignmentMarks = await dispatch(
              apiSlice.endpoints.getAssignmentMarkByAssignmentId.initiate(id)
            ).unwrap();
            //if there is a change to total Mark, then delete assignment mark
            if (
              assignmentMarks?.length > 0 &&
              assignmentMarks[0]?.totalMark !== data.totalMark
            ) {
              //delete the assignment mark
              assignmentMarks.forEach((assignmentMark) => {
                dispatch(
                  apiSlice.endpoints.deleteAssignmentMark.initiate(
                    assignmentMark.id
                  )
                );
              });
            } else {
              assignmentMarks.forEach((assignmentMark) => {
                dispatch(
                  apiSlice.endpoints.updateAssignmentMarkTitle.initiate({
                    id: assignmentMark.id,
                    data: dataToPass,
                  })
                );
              });
            }
          }
        } catch (error) {}
      },
    }),
    deleteAssignment: builder.mutation({
      query: (id) => ({
        url: `/assignments/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const { meta } = result || {};
          if (meta.response?.status === 200) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getAssignments",
                undefined,
                (draft) => {
                  return draft.filter(
                    (assignment) => Number(assignment.id) !== Number(arg)
                  );
                }
              )
            );

            //delete all Assignment against this assignment id
            const assignmentMarks = await dispatch(
              apiSlice.endpoints.getAssignmentMarkByAssignmentId.initiate(arg)
            ).unwrap();

            if (assignmentMarks?.length > 0) {
              assignmentMarks.forEach((markAssignment) => {
                dispatch(
                  apiSlice.endpoints.deleteAssignmentMark.initiate(
                    markAssignment.id
                  )
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
  useGetAssignmentQuery,
  useGetAssignmentsQuery,
  useGetAssignmentWithVideoIdQuery,
  useAddAssignmentMutation,
  useUpdateAssignmentMutation,
  useDeleteAssignmentMutation,
} = assignmentApi;
export default assignmentApi;
