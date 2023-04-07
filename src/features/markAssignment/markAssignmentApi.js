import apiSlice from "../api/apiSlice";

const assignmentMarkApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAssignmentsMark: builder.query({
      query: () => ({
        url: "/assignmentMark",
      }),
      // async onCacheEntryAdded(arg, { cacheDataLoaded, updateCachedData, }) {},
    }),
    getAssignmentMark: builder.query({
      query: (id) => ({
        url: `/assignmentMark/${id}`,
      }),
    }),
    getAssignmentMarkByStudentId: builder.query({
      query: ({ id, student_id }) => ({
        url: `/assignmentMark?assignment_id=${id}&student_id=${student_id}`,
      }),
    }),
    getAssignmentMarkByAssignmentId: builder.query({
      query: (id) => ({
        url: `/assignmentMark?assignment_id=${id}`,
      }),
    }),
    addAssignmentMark: builder.mutation({
      query: (data) => ({
        url: `/assignmentMark`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(
        { assignment_id, student_id },
        { dispatch, queryFulfilled }
      ) {
        try {
          const result = await queryFulfilled;
          const { data, meta } = result || {};
          if (data?.id && meta?.response?.status === 201) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getAssignmentsMark",
                undefined,
                (draft) => {
                  draft.push(data);
                }
              )
            );
            dispatch(
              apiSlice.util.updateQueryData(
                "getAssignmentMarkByStudentId",
                {
                  id: assignment_id,
                  student_id,
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
    updateAssignmentMark: builder.mutation({
      query: ({ id, data }) => ({
        url: `/assignmentMark/${id}`,
        method: "PATCH",
        body: data,
      }),

      async onQueryStarted(
        { id, data: userGivenData },
        { dispatch, queryFulfilled }
      ) {
        try {
          const result = await queryFulfilled;
          const { data, meta } = result || {};

          if (data.id && meta.response.status === 200) {
            //pesimistic update

            dispatch(
              apiSlice.util.updateQueryData(
                "getAssignmentsMark",
                undefined,
                (draft) => {
                  const draftToUpdate = draft.find(
                    (assignmentMark) =>
                      Number(assignmentMark.id) === Number(data?.id)
                  );
                  draftToUpdate.status = data.status;
                  draftToUpdate.mark = data.mark;
                }
              )
            );
            dispatch(
              apiSlice.util.updateQueryData(
                "getAssignmentMark",
                id,
                (draft) => {
                  draft.status = data.status;
                  draft.mark = data.mark;
                }
              )
            );
          }
        } catch (error) {}
      },
    }),
    updateAssignmentMarkTitle: builder.mutation({
      query: ({ id, data }) => ({
        url: `/assignmentMark/${id}`,
        method: "PATCH",
        body: data,
      }),

      async onQueryStarted(
        { id, data: userGivenData },
        { dispatch, queryFulfilled }
      ) {
        try {
          const result = await queryFulfilled;
          const { data, meta } = result || {};

          if (data.id && meta.response.status === 200) {
            //pesimistic update
            dispatch(
              apiSlice.util.updateQueryData(
                "getAssignmentsMark",
                undefined,
                (draft) => {
                  const draftToUpdate = draft.find(
                    (assignmentMark) =>
                      Number(assignmentMark.id) === Number(data?.id)
                  );
                  draftToUpdate.title = data.title;
                }
              )
            );

            //update against id also
            dispatch(
              apiSlice.util.updateQueryData(
                "getAssignmentMark",
                id,
                (draft) => {
                  draft.title = data.title;
                }
              )
            );
          }
        } catch (error) {}
      },
    }),
    deleteAssignmentMark: builder.mutation({
      query: (id) => ({
        url: `/assignmentMark/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          const { meta } = result || {};
          if (meta?.response?.status === 200) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getAssignmentsMark",
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
  useGetAssignmentsMarkQuery,
  useGetAssignmentMarkQuery,
  useGetAssignmentMarkByStudentIdQuery,
  useAddAssignmentMarkMutation,
  useUpdateAssignmentMarkMutation,
} = assignmentMarkApi;
export default assignmentMarkApi;
