import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
const initialState = {
  token: null,
  loggedUser: {
    name: null,
    difficulty: null,
  },
  currentScore: 0,
  userDetails: {
    userId: null,
    high_score: 0,
  },
  wordsArr: [],
}

export const authenicateUser = createAsyncThunk('auth/user', async (data) => {
  try {
    let { token, endpoint } = data

    const response = await axios({
      url: `${import.meta.env.VITE_SERVER_URL}/user/${endpoint}`,

      method: 'POST',
      headers: {
        authorization: token,
      },
    })
    return response.data
  } catch (error) {
    console.log(error)
  }
})
export const updateUser = createAsyncThunk('auth/update', async (data) => {
  let { token, score } = data
  console.log(data)
  try {
    const response = await axios({
      url: `${import.meta.env.VITE_SERVER_URL}/user/update`,

      data: {
        score,
      },
      method: 'PUT',
      headers: {
        authorization: token,
      },
    })
    return response.data
  } catch (error) {
    console.log(error)
  }
})
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload
    },
    setData(state, action) {
      state.userDetails = action.payload.user
      state.wordsArr = action.payload.wordsArr
    },
    setDifficulty(state, action) {
      state.loggedUser.difficulty = action.payload.difficulty
      state.loggedUser.name = action.payload.name
    },
    increaseScore(state, action) {
      state.currentScore = action.payload
    },
    setHighScore(state, action) {
      state.userDetails.high_score = action.payload
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(authenicateUser.pending, () => {
      console.log('Authenication Pending')
    })
    builder.addCase(authenicateUser.fulfilled, () => {
      console.log('Authenication Completed')
    })
    builder.addCase(authenicateUser.rejected, () => {
      console.log('Authenication Rejected')
    })
    builder.addCase(updateUser.pending, () => {
      console.log('User Update Pending')
    })
    builder.addCase(updateUser.fulfilled, () => {
      console.log('User Update Completed')
    })
    builder.addCase(updateUser.rejected, () => {
      console.log('User Update Rejected')
    })
  },
})

// Action creators are generated for each case reducer function
export const {
  setToken,
  setData,
  setDifficulty,
  increaseScore,
  setHighScore,
} = authSlice.actions

export default authSlice.reducer
