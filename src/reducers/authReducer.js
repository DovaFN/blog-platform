/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const createUser = createAsyncThunk('auth/createUser', async (data) => {
  const body = JSON.stringify({
    user: {
      ...data,
    },
  })

  try {
    const response = await fetch('https://blog.kata.academy/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: `${body}`,
    })
    if (response.ok) {
      const res = await response.json()
      return res
    }
    if (!response.ok) {
      throw new Error('Add valid data and try again.')
    }
  } catch (err) {
    throw new Error(err)
  }
})

const updateUser = createAsyncThunk('auth/updateUser', async (data) => {
  const { password, ...user } = data
  if (password) {
    user.password = password
  }

  const apiKey = localStorage.getItem('token')

  const body = JSON.stringify({
    user,
  })

  try {
    const response = await fetch('https://blog.kata.academy/api/user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${apiKey}`,
      },
      body: `${body}`,
    })

    if (response.ok) {
      const res = await response.json()
      return res
    }
    if (!response.ok) {
      throw new Error('Add valid data and try again.')
    }
  } catch (err) {
    throw new Error(err)
  }
})

const loginUser = createAsyncThunk('auth/loginUser', async (data) => {
  const body = JSON.stringify({
    user: data,
  })

  try {
    const response = await fetch('https://blog.kata.academy/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: `${body}`,
    })
    if (response.ok) {
      const res = await response.json()
      return res
    }
    if (!response.ok) {
      throw new Error('Add valid data and try again.')
    }
  } catch (err) {
    throw new Error(err)
  }
})

const localLogOut = () => localStorage.clear()

const initState = {
  authError: false,
  errorMessage: '',
  loading: false,
  user: (localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'))) || { username: '', email: '' },
  succeedMsg: '',
}

const authSlice = createSlice({
  name: 'articles',
  initialState: initState,
  reducers: {
    clearSucceedMsg: (state, action) => {
      state.succeedMsg = ''
    },
    logOut: (state, action) => {
      localLogOut()
      state.user = {}
      state = initState
    },
    resetAuth: (state, action) => {
      state.authError = false
      state.errorMessage = ''
      state.succeedMsg = ''
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false
      state.authError = false
      state.errorMessage = ''
      const { user } = action.payload
      const { token, ...userProps } = user
      state.user = userProps

      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(state.user))
    })
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false
      state.authError = true
      if (action.error.message[0] === 'A') {
        state.errorMessage = `Action failed, ${action.error.message}`
      } else {
        state.errorMessage = 'Action failed, check your internet connection and try again'
      }
    })
    builder.addCase(createUser.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.loading = false
      state.authError = false
      const { user } = action.payload
      const { token, ...userProps } = user
      state.user = userProps
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(state.user))
    })
    builder.addCase(createUser.rejected, (state, action) => {
      state.loading = false
      state.authError = true
      if (action.error.message[0] === 'A') {
        state.errorMessage = `Action failed, ${action.error.message}`
      } else {
        state.errorMessage = 'Action failed, check your internet connection and try again'
      }
    })
    builder.addCase(updateUser.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false
      state.authError = false
      const { user } = action.payload
      const { token, ...userProps } = user
      state.user = userProps
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(state.user))
      state.errorMessage = ''
      state.succeedMsg = 'Successfully Updated'
    })
    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = false
      state.authError = true
      if (action.error.message[0] === 'A') {
        state.errorMessage = `Action failed, ${action.error.message}`
      } else {
        state.errorMessage = 'Action failed, check your internet connection and try again'
      }
    })
  },
})

const { setRedirect, clearSucceedMsg, logOut, resetAuth } = authSlice.actions

export { createUser, loginUser, setRedirect, clearSucceedMsg, updateUser, logOut, resetAuth }

export default authSlice
