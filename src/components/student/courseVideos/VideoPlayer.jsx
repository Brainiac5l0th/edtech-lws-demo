import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addCurrentVideo } from "../../../features/filters/filtersSlice";
import { useGetVideoQuery } from '../../../features/videos/videosApi';
import { formateDate } from '../../../utils/formatting';
import Error from '../../ui/common/Error';
import Loading from '../../ui/common/Loading';

const VideoPlayer = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    dispatch(addCurrentVideo(id));
    const { data: video, isLoading, isError } = useGetVideoQuery(id);
    const { title, description, url, createdAt } = video || {};

    // renderable content 
    let content;
    if (isLoading) content = <Loading />
    else if (!isLoading && isError) content = <Error />
    else if (!isLoading && !isError && !video.id) content = <Error message='No video Found' />
    else if (!isLoading && !isError && video.id) {
        //date in readable format
        const formatedDate = formateDate(createdAt)
        content = <>
            <div>
                <h1 className="text-lg font-semibold tracking-tight text-slate-100">
                    {title}
                </h1>
                <h2 className=" pb-4 text-sm leading-[1.7142857] text-slate-400">
                    Uploaded on {formatedDate}
                </h2>

                <div className="flex gap-4">
                    <button
                        className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary">
                        এসাইনমেন্ট
                    </button>

                    <a href="./Quiz.html"
                        className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary">কুইজে
                        অংশগ্রহণ
                        করুন</a>
                </div>
                <p className="mt-4 text-sm text-slate-400 leading-6">
                    {description}
                </p>
            </div>
        </>
    }
    return (
        <div className="col-span-full w-full space-y-8 lg:col-span-2">
            <iframe id="frame" width="100%" className="aspect-video frameborder-0" src={url ? url : ""}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen></iframe>
            {content}
        </div>
    )
}

export default VideoPlayer