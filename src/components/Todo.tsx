import { toast } from "react-hot-toast";

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
    },
    onSuccess: (err, { checked }) => {
      if (checked) {
        toast.success('🎊 Todo completed!! 🎉')
      }
    }
  })

  const { mutate: deleteMutation } = api.todo.deleteTodo.useMutation({
    onSettled: async () => {
      await trpc.todo.getAllTodos.invalidate()
    }
  })

  return (
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
          <label htmlFor={id} className={`cursor-pointer max-w-[200px] ${checked ? 'line-through' : ''}`}>
            {todoText}
          </label>
        </div>

        <button onClick={(event) => deleteMutation(id)}>
          ✖
        </button>
      </div>
    </>
  )
}