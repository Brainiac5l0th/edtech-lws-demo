import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useGetAssignmentWithVideoIdQuery } from '../../../features/assignment/assignmentApi';
import { addCurrentVideo } from '../../../features/filters/filtersSlice';
import { useGetQuizzesWithVideoIdQuery } from '../../../features/quizzes/quizzesApi';
import { useGetVideoQuery } from '../../../features/videos/videosApi';
import { formateDate } from '../../../utils/formatting';
import Error from '../../ui/common/Error';
import Loading from '../../ui/common/Loading';
import Modal from "../../ui/common/customModal/Modal";
import AssignmentForm from './AssignmentForm';
import QuizForm from './QuizForm';


const VideoPlayer = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [idCheck, setIdCheck] = useState(true);
    const [modalMode, setModalMode] = useState(false);
    const [isAssignment, setIsAssignment] = useState(false);
    const [isQuiz, setIsQuiz] = useState(false);
    const { user: loggedInUser } = useSelector(state => state.auth) || {};

    //localstorage e save kore dite hobe pore
    // dispatch(addCurrentVideo(id));

    //thunks
    const {
        data: assignment,
        isLoading: isAssignmentLoading,
        isError: isAssignmentError } = useGetAssignmentWithVideoIdQuery(id, { skip: idCheck }) || {};
    const {
        data: quiz,
        isLoading: isQuizLoading,
        isError: isQuizError } = useGetQuizzesWithVideoIdQuery(id, { skip: idCheck });
    const { data: video, isLoading, isError } = useGetVideoQuery(id);
    const { title, description, url, createdAt } = video || {};

    //effects
    useEffect(() => {
        if (id) setIdCheck(false);
    }, [id])

    useEffect(() => {
        dispatch(addCurrentVideo(id))
        return () => {
            localStorage.setItem("lastVideo", JSON.stringify({
                student_id: loggedInUser?.id,
                lastVideoId: id,
            }))
        }
    }, [id, dispatch, loggedInUser?.id])

    //handler
    const handleModal = (modalName) => {
        setIsAssignment(false);
        setIsQuiz(false);
        if (modalName === "assignment") setIsAssignment(true);
        if (modalName === "quiz") setIsQuiz(true);
        setModalMode(true);
    }
    //assignment content
    const assignmentContent = assignment?.length > 0 ?
        <button
            className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary" onClick={() => handleModal("assignment")}>
            এসাইনমেন্ট
        </button> :
        <button
            disabled={true}
            className="px-3 font-bold py-1 border border-pink text-pink rounded-full text-sm  cursor-not-allowed">
            এসাইনমেন্ট নেই
        </button>

    // quiz content
    const quizContent = quiz?.length > 0 ?
        <button href="./Quiz.html"
            className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary" onClick={() => handleModal("quiz")}>
            কুইজে অংশগ্রহণ করুন
        </button> :
        <button
            disabled={true}
            className="px-3 font-bold py-1 border border-pink text-pink rounded-full text-sm cursor-not-allowed">
            কুইজ নেই
        </button>;

    // renderable content 
    let content;
    if (isLoading) content = <Loading />
    else if (!isLoading && isError) content = <Error />
    else if (!isLoading && !isError && !video.id) content = <Error message='No video Found' />
    else if (!isLoading && !isError && video.id) {
        //date in readable format
        const formatedDate = formateDate(createdAt)
        content =
            <>
                <div>
                    <h1 className="text-lg font-semibold tracking-tight text-slate-100">
                        {title}
                    </h1>
                    <h2 className=" pb-4 text-sm leading-[1.7142857] text-slate-400">
                        Uploaded on {formatedDate}
                    </h2>

                    <div className="flex gap-4">
                        {assignmentContent}

                        {quizContent}
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
            {modalMode && isAssignment
                &&
                <Modal mode={modalMode} setMode={setModalMode}>
                    <AssignmentForm assignment={assignment} isLoading={isAssignmentLoading} isError={isAssignmentError} setMode={setModalMode} />
                </Modal>}
            {modalMode && isQuiz
                &&
                <Modal mode={modalMode} setMode={setModalMode}>
                    <QuizForm quiz={quiz} isLoading={isQuizLoading} isError={isQuizError} />
                </Modal>}
        </div>
    )
}

export default VideoPlayer