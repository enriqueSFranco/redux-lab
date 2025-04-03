import { Link, useNavigate } from "@tanstack/react-router";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { selectCurrentUsername, userLoggedOut } from "../../features/auth/authSlice";

export function Navbar () {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const username = useAppSelector(selectCurrentUsername)

  function handleLogout () {
    dispatch(userLoggedOut())
    navigate({ to: '/' })
  }

  return (
    <nav>
      <header>
        <ul className="flex gap-4 justify-center items-center capitalize">
          <li>
            <Link to="/">home</Link>
          </li>
          {!username ? (
            <li>
              <Link to="/login">Login</Link>
            </li>
          ) : (
            <li>
              <button className="cursor-pointer text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={handleLogout}>Logout</button>
            </li>
          )}
        </ul>
      </header>
    </nav>
  )
}