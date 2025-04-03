import './App.css'

import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen.ts'
import { selectCurrentUsername } from './features/auth/authSlice.ts'
import { useAppSelector } from './hooks.ts'

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  context: { auth: undefined }
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function App () {
  const username = useAppSelector(selectCurrentUsername)
  const isAuthenticated = !!username
  return <RouterProvider router={router} context={{ auth: { isAuthenticated, username } }} />
}

export default App
