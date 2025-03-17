import { Link } from "@tanstack/react-router";

export function Navbar () {
  return (
    <nav>
      <header>
        <h2>Redux Essentials Example</h2>
        <ul className="flex gap-4 justify-center items-center capitalize">
          <li>
            <Link to="/">home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </header>
    </nav>
  )
}