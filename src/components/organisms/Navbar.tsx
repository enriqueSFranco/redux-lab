import { Link } from "@tanstack/react-router";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { selectCurrentUser } from "../../features/users/usersSlice";
import { userLoggedOut } from "../../features/auth/authSlice";

export function Navbar () {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectCurrentUser)

  function onLogOutClicked () {
    if (user) {
      dispatch(userLoggedOut())
    }
  }

  return (
    <nav>
      <header>
        <h2>Redux Essentials Example</h2>
        <ul className="flex gap-4 justify-center items-center capitalize">
          <li>
            <Link to="/">home</Link>
          </li>
          <li>
            <Link to="/posts">Posts</Link>
          </li>
          <li>
            <button type="button" className="cursor-pointer" onClick={onLogOutClicked}>Log out</button>
          </li>
        </ul>
      </header>
    </nav>
  )
}