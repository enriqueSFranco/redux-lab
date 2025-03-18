import type { Action, ThunkAction } from '@reduxjs/toolkit'
import { configureStore } from '@reduxjs/toolkit'
import postsReducer from '../features/posts/postsSlice'
import counterReducer from '../features/counter/counterSlice'
import usersReducer from '../features/users/usersSlice'
import authSlice from '../features/auth/authSlice'
import { apiSlice } from '../features/api/apiSlice'

// creamos la store
export const store = configureStore({
    reducer: {
        posts: postsReducer,
        users: usersReducer,
        auth: authSlice,
        [apiSlice.reducerPath]: apiSlice.reducer,
        counter: counterReducer
    },
    middleware: getDefaultMiddleware => {
        return getDefaultMiddleware().concat(apiSlice.middleware)
    }
})

// Inferir el type de la store
export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']> // ReturnType<typeof store.getState>
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore['dispatch'] // typeof store.dispatch
// Define a reusable type describing thunk functions
export type AppThunk<ThunkReturnType = void> = ThunkAction<ThunkReturnType, RootState, unknown, Action>
