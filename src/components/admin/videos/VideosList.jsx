import React from 'react';
import { useGetVideosQuery } from '../../../features/videos/videosApi';
import Error from '../../ui/common/Error';
import Loading from '../../ui/common/Loading';
import VideosItem from './VideosItem';

const VideosList = () => {
    const { data: videos, isLoading, isError } = useGetVideosQuery();

    //decide what to render 
    let content;
    if (isLoading) content = <Loading />
    else if (!isLoading && isError) content = <Error />
    else if (!isLoading && !isError && videos.length === 0) content = <Error message='No videos Found' />
    else if (!isLoading && !isError && videos.length > 0) {
        content = <table className="divide-y-1 text-base divide-gray-600 w-full">
            <thead>
                <tr>
                    <th className="table-th">Video Title</th>
                    <th className="table-th">Description</th>
                    <th className="table-th">Action</th>
                </tr>
            </thead>

            <tbody className="divide-y divide-slate-600/50">
                {videos?.map(video => <VideosItem key={video.id} videoInfo={video} />)}
            </tbody>
        </table>
    }


    return (
        <div className="overflow-x-auto mt-4">
            {content}
        </div>
    )
}

export default VideosList