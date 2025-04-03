import { useNavigate } from "@tanstack/react-router"
import { userLoggedIn } from "../../features/auth/authSlice"
import { selectAllUsers } from "../../features/users/usersSlice"
import { useAppDispatch, useAppSelector } from "../../hooks"


interface LoginFormFields extends HTMLFormControlsCollection {
    username: HTMLSelectElement
}

interface LoginFormElements extends HTMLFormElement {
    readonly elements: LoginFormFields
}

export function LoginForm () {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const users = useAppSelector(selectAllUsers)

    function handleSubmit (e: React.FormEvent<LoginFormElements>) {
        e.preventDefault()

        const username = e.currentTarget.elements.username.value

        dispatch(userLoggedIn(username))
        navigate({ to: '/posts' })
    }

    return (
        <section className="grid place-content-center">
            <h2>Welcome to Tweeter!</h2>
            <form onSubmit={handleSubmit} className="flex flex-col items-start gap-4 w-64">
                <label htmlFor="username" className="text-left">Select username:</label>
                <select name="username" id="username" className="bg-gray-700 outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3xs p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="">Select user</option>
                    {users.map(({ name }) => (
                        <option key={`user-${name}`}>{name}</option>
                    ))}
                </select>
                <button className="m-auto text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Log In</button>
            </form>
        </section>
    )
}