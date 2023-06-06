import { api } from "~/utils/api"
import { Todo } from "./Todo"


export function Todos() {
  const { data: todos, isLoading, isError } = api.todo.getAllTodos.useQuery()

  if (isLoading) {
    return <div>🔄 Loading Todos... 🔄</div>
  }

  if (isError) {
    return <div>❌ Can not fetching Todos ❌</div>
  }
  return (
    <>
      {
        todos.length ? (todos.map((todo) => {
          return (
            <Todo key={todo.id} todo={todo} />
          )
        })) :
          'Create your First Todo...'
      }
    </>
  )
}