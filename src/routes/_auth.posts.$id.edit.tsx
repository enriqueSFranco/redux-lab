import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/posts/$id/edit')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/posts/$id/edit"!</div>
}
