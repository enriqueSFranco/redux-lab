import type { Action, ThunkAction } from '@reduxjs/toolkit'
import { configureStore } from '@reduxjs/toolkit'
import postsReducer from '../features/posts/postsSlice'
import counterReducer from '../features/counter/counterSlice'

// creamos la store
export const store = configureStore({
    reducer: {
        posts: postsReducer,
        counter: counterReducer
    }
})

// Inferir el type de la store
export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']> // ReturnType<typeof store.getState>
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore['dispatch'] // typeof store.dispatch
// Define a reusable type describing thunk functions
export type AppThunk<ThunkReturnType = void> = ThunkAction<ThunkReturnType, RootState, unknown, Action>
