import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  quizzes: [],
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    addQuiz: (state, action) => {
      state.quizzes = action.payload;
    },
    updateChecked: (state) => {
      state.quizzes.forEach((quiz) =>
        quiz.options.forEach((option) => (option.checked = false))
      );
    },
    updateQuizAnswer: (state, action) => {
      state.quizzes.forEach((quiz) => {
        if (quiz.id === action.payload.quesId) {
          quiz.options.forEach((option) => {
            if (option.id === action.payload.optId) {
              option.checked = action.payload.value;
            }
          });
        }
      });
    },
  },
});
export const { addQuiz, updateQuizAnswer, updateChecked } = quizSlice.actions;
export default quizSlice.reducer;
