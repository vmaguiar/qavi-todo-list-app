import type { Todo } from "~/types";
import { api } from "~/utils/api";


type TodoProps = {
  todo: Todo
}
export function Todo({ todo }: TodoProps) {
  const { id, todoText, checked } = todo

  const trpc = api.useContext()

  const { mutate: checkedMutation } = api.todo.toggleCheckedTodo.useMutation({
    onSettled: async () => {
      await trpc.todo.getAllTodos.invalidate()
    }
  })

  return (
    // <>
    //   {todoText}
    // </>

    <>
      <div className="w-full flex flex-row justify-between" key={id}>
        <div className="max-w-[200px] break-words">
          <input
            className="cursor-pointer mr-1"
            checked={checked}
            type="checkbox"
            name={id}
            id={id}
            onChange={(event) => { checkedMutation({ id, checked: event.target.checked }) }}
          />
          <label htmlFor={id} className="cursor-pointer max-w-[200px]">
            {todoText}
          </label>
        </div>

        <button>✖</button>

        {/* <div className="ml-4 whitespace-nowrap">
        </div> */}
      </div>
    </>
  )
}