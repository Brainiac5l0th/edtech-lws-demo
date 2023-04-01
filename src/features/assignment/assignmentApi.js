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
  }),
});

export const {
  useGetAssignmentQuery,
  useGetAssignmentsQuery,
  useAddAssignmentMutation,
} = assignmentApi;
export default assignmentApi;
