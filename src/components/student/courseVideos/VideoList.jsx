import React from 'react';
import { useGetVideosQuery } from '../../../features/videos/videosApi';
import Error from "../../ui/common/Error";
import Loading from "../../ui/common/Loading";
import VideoItem from './VideoItem';
const VideoList = () => {
    const { data: videos, isLoading, isError } = useGetVideosQuery();

    //decide what to render 
    let content;
    if (isLoading) content = <Loading />
    else if (!isLoading && isError) content = <Error />
    else if (!isLoading && !isError && videos.length === 0) content = <Error message='No videos Found' />
    else if (!isLoading && !isError && videos.length > 0) {
        content = videos?.map(video => <VideoItem key={video.id} videoInfo={video} />)
    }
    return (
        <div
            className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto bg-secondary p-4 rounded-md border border-slate-50/10 divide-y divide-slate-600/30">
            {content}
        </div>
    )
}

export default VideoList