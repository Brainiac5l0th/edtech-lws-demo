import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TopResults, UserResult } from '../../components/student';
import apiSlice from '../../features/api/apiSlice';
import { useGetAssignmentsMarkQuery } from '../../features/markAssignment/markAssignmentApi';
import { useGetQuizMarksQuery } from '../../features/quizMark/quizMarkApi';
import { useGetStudentsQuery } from '../../features/users/usersApi';
import calculateTotalMark from '../../utils/calculateTotalMark';

const Leaderboard = () => {
    const dispatch = useDispatch();
    const {
        data: quizMarkAll,
        isLoading: isQuizLoading,
        isError: isQuizError } = useGetQuizMarksQuery();
    const {
        data: assignmentMarkAll,
        isLoading: isAssignmentLoading,
        isError: isAssignmentError } = useGetAssignmentsMarkQuery();
    const {
        data: students,
        isLoading: isStudentsLoading,
        isError: isStudentsError } = useGetStudentsQuery();
    // ["position", "Name", "total", "assignmentTotalMark", "quizTotalMark"]
    const { user: loggedInUser } = useSelector(state => state.auth);

    const isLoading = [isQuizLoading, isAssignmentLoading, isStudentsLoading].some(Boolean)
    const isError = [isQuizError, isAssignmentError, isStudentsError].some(Boolean)

    let finalResults = [];
    if (!isLoading && !isError) {
        students?.forEach(student => {
            let assignmentMark, totalQuizMark;
            totalQuizMark = calculateTotalMark(quizMarkAll, student.id);
            assignmentMark = calculateTotalMark(assignmentMarkAll, student.id);
            const student_data = {
                id: student.id,
                name: student.name,
                totalQuizMark,
                assignmentMark,
                total: totalQuizMark + assignmentMark,
                rank: undefined,
            }
            finalResults.push(student_data);
        })
    }
    //effects
    useEffect(() => { document.title = "Leaderboard" }, [])

    useEffect(() => {
        //as the page load, the students information should be fetched first.
        const studentFirst = async () => {
            await dispatch(apiSlice.endpoints.getStudents.initiate());
        }
        studentFirst();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //sort them by number
    const sortByNumberDesc = (a, b) => Number(b.total) - Number(a.total)
    //function to set rank of student
    const setPosition = (results) => {
        const final = results?.map((result, i) => {
            if (i === 0) {
                result.rank = 1;
            } else if (i > 0) {
                const prevResult = results[i - 1];
                if (prevResult?.total === result?.total) {
                    result.rank = prevResult?.rank;
                } else {
                    result.rank = prevResult?.rank + 1;
                }
            }
            return result;
        })

        return final;
    }

    const sortedfinalResults = finalResults?.length > 0 && [...finalResults].sort(sortByNumberDesc)
    const sortedfinalResultsWithRank = sortedfinalResults?.length > 0 && setPosition(sortedfinalResults);

    const userResult = sortedfinalResultsWithRank?.length > 0 && sortedfinalResultsWithRank.find(result => result.id === loggedInUser?.id);

    return (
        <section className="py-6 bg-primary">
            <div className="mx-auto max-w-7xl px-5 lg:px-0">
                <UserResult info={userResult} />

                <TopResults finalResult={sortedfinalResultsWithRank} />
            </div>
        </section>
    )
}

export default Leaderboard