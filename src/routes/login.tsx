import { createFileRoute, redirect } from "@tanstack/react-router";
import { LoginForm } from "../components/organisms/LoginForm";

export const Route = createFileRoute('/login')({
	component: LoginForm,
	beforeLoad: ({ context, search }) => {
		const { auth } = context
		if (auth.isAuthenticated) {
			const redirecTo = search.redirect || '/'
			throw redirect({ to: redirecTo })
		}
	}
})
