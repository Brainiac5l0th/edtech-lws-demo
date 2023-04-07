import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { TopResults, UserResult } from '../../components/student';
import { useGetAssignmentsMarkQuery } from '../../features/markAssignment/markAssignmentApi';
import { useGetQuizMarksQuery } from '../../features/quizMark/quizMarkApi';
import { useGetStudentsQuery } from '../../features/users/usersApi';
import calculateTotalMark from '../../utils/calculateTotalMark';

const Leaderboard = () => {

    const { data: quizMarkAll, isQuizLoading, isQuizError } = useGetQuizMarksQuery();
    const { data: assignmentMarkAll, isAssignmentLoading, isAssignmentError } = useGetAssignmentsMarkQuery();
    const { data: students, isStudentsLoading, isStudentsError } = useGetStudentsQuery();
    // ["position", "Name", "total", "assignmentTotalMark", "quizTotalMark"]
    const { user: loggedInUser } = useSelector(state => state.auth);

    const isLoading = [isQuizLoading, isAssignmentLoading, isStudentsLoading].every(Boolean)
    const isError = [isQuizError, isAssignmentError, isStudentsError].every(Boolean)

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


    //sort them by number
    const sortByNumberDesc = (a, b) => Number(b.total) - Number(a.total)
    //function to set rank of student
    const setPosition = (result, i) => {
        if (i === 0) {
            //highest one take first place
            result.rank = 1;
        }
        else if (i > 0) {
            let prevResult = result[i - 1];
            if (prevResult?.total === result?.total) {
                //if both user have same total number, they get same rank
                result.rank = prevResult?.rank;
            } else {
                result.rank = i + 1;
            }
        }

        return result;
    }
    const sortedfinalResultsWithRank = finalResults?.length > 0 && [...finalResults].sort(sortByNumberDesc).map(setPosition);

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