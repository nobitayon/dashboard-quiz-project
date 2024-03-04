import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  quizs: [],
  errorFetchQuiz:false,
  loadingFetchQuiz:true
}

export const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setQuiz: (state, action) => {
      state.quizs = action.payload
    },
    setErrorFetchQuiz:(state,action)=>{
      state.errorFetchQuiz = action.payload
    },
    setLoadingFetchQuiz:(state,action)=>{
      state.loadingFetchQuiz = action.payload
    }
  },
})

export const { setQuiz, setErrorFetchQuiz } = quizSlice.actions

export default quizSlice.reducer