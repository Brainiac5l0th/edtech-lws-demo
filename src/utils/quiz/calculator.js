import _ from "lodash";

const quizCalculator = (quizzes) => {
  let correct_answer = 0;
  let wrong_answer = 0;
  let mark = 0;
  let total_quiz = 0;
  quizzes.forEach((quiz, index1) => {
    let correctIndexes = [],
      checkedIndexes = [];
    quiz.options.forEach((option, index2) => {
      if (option.isCorrect) {
        correctIndexes.push(index1);
      }
      if (option.checked) {
        checkedIndexes.push(index2);
      }
    });
    if (_.isEqual(correctIndexes, checkedIndexes)) {
      mark = mark + 5;
      correct_answer += 1;
    } else {
      wrong_answer += 1;
    }
    total_quiz += 1;
  });
  const total_mark = total_quiz * 5;

  return { correct_answer, wrong_answer, total_quiz, total_mark, mark };
};

export default quizCalculator;
