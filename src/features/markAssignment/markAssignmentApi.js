import apiSlice from "../api/apiSlice";

const assignmentMarkApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAssignmentsMark: builder.query({
      query: () => ({
        url: "/assignmentMark",
      }),
    }),
    getAssignmentMark: builder.query({
      query: (id) => ({
        url: `/assignmentMark/${id}`,
      }),
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
  }),
});

export const {
  useGetAssignmentsMarkQuery,
  useGetAssignmentMarkQuery,
  useUpdateAssignmentMarkMutation,
} = assignmentMarkApi;
export default assignmentMarkApi;
