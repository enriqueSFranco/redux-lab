import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index () {
  return (
    <div className='p-2'>
      <h1>welcome</h1>
    </div>
  );
}
