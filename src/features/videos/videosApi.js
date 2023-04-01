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
          }
        } catch (error) {
          console.log(error);
        }
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
          console.log(arg);
          const { data, meta } = result || {};
          if (meta.response?.status === 200) {
            dispatch(
              apiSlice.util.updateQueryData("getVideos", undefined, (draft) => {
                console.log("hello");
                return draft.filter((video) => Number(video.id) !== Number(arg));
              })
            );
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
