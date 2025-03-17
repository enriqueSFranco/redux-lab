import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useAppDispatch, useAppSelector } from "../hooks";
import { selectCurrentUsername, userLoggedOut } from "../features/auth/authSlice";
import { PostList } from "../components/organisms/PostList";

export const Route = createFileRoute("/_auth")({
  beforeLoad: ({ context, location }) => {
    if (context === null) {
      throw redirect({
        to: '/login',
        search: location.href
      })
    }
  },
  component: AuthLayout
});

function AuthLayout () {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectCurrentUsername)

  function onLogOutClicked () {
    dispatch(userLoggedOut())
    navigate({ to: '/' })
  }
  return (
    <div>
      <section>
        <nav>
          <ul className="flex gap-4 items-center">
            <li>
              <span>Hi {user} 👋</span>
            </li>
            <li>
              <button className="cursor-pointer text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={onLogOutClicked}>Logout</button>
            </li>
          </ul>
        </nav>
        <PostList />
      </section>
    </div>
  );
}
