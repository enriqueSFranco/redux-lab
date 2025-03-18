import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { selectCurrentUsername } from "../auth/authSlice";
import { createAppAsyncThunk } from "../../app/withTypes";
import { client } from "../../api/client";

export interface User {
	id: string
	name: string
}


const initialState: User[] = []

export const fetchUsers = createAppAsyncThunk('users/fetchUsers', async () => {
	const response = await client.get<User[]>('/fakeApi/users')
	return response.data
})


export const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {},
	extraReducers (builder) {
		builder
			.addCase(fetchUsers.fulfilled, (state, action) => {
				/**
				 * Immer nos permite actualizar el estado de dos maneras: 
				 * 1.- Mutando el valor LOCAL existente
				 * 2.- RETORNANDO un nuevo resultado.
				 */
				return action.payload
			})
	}
})


export default usersSlice.reducer

export const selectAllUsers = (state: RootState) => state.users
export const selectUserById = (state: RootState, userId: string | null) =>
	state.users.find(user => user.id === userId)

export const selectCurrentUser = (state: RootState) => {
	const currentUsername = selectCurrentUsername(state)
	return selectUserById(state, currentUsername)
}