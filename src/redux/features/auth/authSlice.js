import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from '../../../utils/axios'

const initialState = {
    user: null,
    token: null,
    isLoading: false,
    status: null
}

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async({ email, username, password }) => {
        try {
            const { data } = await axios.post('/auth/register', {
                email,
                username,
                password
            })

            if (data.token) {
                window.localStorage.setItem('token', data.token)
            }

            return data
        } catch (error) {
            console.log(error)
        }
    }
)

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ email, password }) => {
        try {
            const { data } = await axios.post('/auth/login', {
                email, 
                password
            })

            if (data.token) {
                window.localStorage.setItem('token', data.token)
            }

            return data
        } catch (error) {
            console.log(error)
        }
    }
)

export const getMe = createAsyncThunk(
    'auth/getMe',
    async () => {
        try {
            const { data } = await axios.get('/auth/me')
            return data
        } catch (error) {
            console.log(error)
        }
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null
            state.token = null
            state.isLoading = false
            state.status = null
        },
    },
    extraReducers: {
        // Register User
        [registerUser.pending]: (state) => {
            state.isLoading = true
            state.status = null
        },
        [registerUser.fulfilled]: (state, action) => {
            if (action.payload) {
                state.isLoading = false
                state.status = action.payload.message
                state.user = action.payload.user
                state.token = action.payload.token
            } else {
                state.isLoading = false
                state.status = 'Такой пользователь уже существует'
            }
        },
        [registerUser.rejected]: (state, action) => {
            if (action.payload) {
                state.status = action.payload.message
            } else {
                state.status = 'Такой пользователь уже существует'
            }
            state.isLoading = false
        },
        // Login user
        [loginUser.pending]: (state) => {
            state.isLoading = true
            state.status = null
        },
        [loginUser.fulfilled]: (state, action) => {
            if (action.payload) {
                state.isLoading = false
                state.status = action.payload.message
                state.user = action.payload.user
                state.token = action.payload.token
            } else {
                state.isLoading = false
                state.status = 'Неверный логин или пароль'
            }
        },
        [loginUser.rejected]: (state, action) => {
            if (action.payload) {
                state.status = action.payload.message
            } else {
                state.status = 'Неверный логин или пароль'
            }
            state.isLoading = false
        },
        // Authorization checking
        [getMe.pending]: (state) => {
            state.isLoading = true
            state.status = null
        },
        [getMe.fulfilled]: (state, action) => {
            state.isLoading = false
            state.status = null
            state.user = action.payload?.user
            state.token = action.payload?.token
        },
        [getMe.rejected]: (state, action) => {
            state.status = action.payload.message
            state.isLoading = false
        }
    }
})

export const checkIsAuth = state => Boolean(state.auth.token)

export const { logout } = authSlice.actions
export default authSlice.reducer