import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

// const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjUsInJvbGUiOiJhZG1pbiJ9.m82u9ZQfMHLEeB_kbSynmssNkulfr4ATylYybfHjZ8U"
// const axiosInstance = axios.create({
//   baseURL: 'http://127.0.0.1:8000', // Set your base URL here
//   headers: {
//     'Content-Type': 'application/json',
//     'Authorization': `Bearer ${authToken}` // Include bearer token in the Authorization header
//   }
// });



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

// Action creators are generated for each case reducer function
export const { setQuiz, setErrorFetchQuiz } = quizSlice.actions

export default quizSlice.reducer