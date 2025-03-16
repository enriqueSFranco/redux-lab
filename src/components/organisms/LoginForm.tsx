import { useNavigate } from "@tanstack/react-router"
import { userLoggedIn } from "../features/auth/authSlice"
import { selectAllUsers } from "../features/users/usersSlice"
import { useAppDispatch, useAppSelector } from "../hooks"


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
        navigate({ to: '/' })
    }

    return (
        <section>
            <h2>Welcome to Tweeter!</h2>
            <h3>Please log in:</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <option value=""></option>
                <select name="username" id="username">
                    {users.map(({ name }) => (
                        <option key={`user-${name}`}>{name}</option>
                    ))}
                </select>
                <button>Log In</button>
            </form>
        </section>
    )
}