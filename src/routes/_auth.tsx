import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { useAppSelector } from "../hooks";
import { selectCurrentUsername } from "../features/auth/authSlice";

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
  const user = useAppSelector(selectCurrentUsername)

  return (
    <div>
      <section>
        <nav>
          <ul className="flex gap-4 items-center">
            <li>
              <span>Hi {user} 👋</span>
            </li>
          </ul>
        </nav>
        <Outlet />
      </section>
    </div>
  );
}
