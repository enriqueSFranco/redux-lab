import './App.css'

import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen.ts'
const router = createRouter({ routeTree, context: { authentication: undefined } })


declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function App () {
  return <RouterProvider router={router} />
}

export default App
