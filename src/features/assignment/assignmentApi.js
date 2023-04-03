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
