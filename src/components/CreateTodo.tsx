import { useState } from "react"
import { toast } from "react-hot-toast"

import { api } from "~/utils/api"
import { todoInput } from "~/types"


export function CreateTodo() {
  const [newTodoInput, setNewTodoInput] = useState('')

  const trpc = api.useContext()

  const { mutate } = api.todo.createTodo.useMutation({
    onSettled: async () => {
      await trpc.todo.getAllTodos.invalidate()
    }
  })


  const handleSubmitForm = () => {
    const result = todoInput.safeParse(newTodoInput)
    if (!result.success) {
      toast.error(result.error.format()._errors.join())
      return
    }

    //create todo mutation here
    mutate(newTodoInput)
    setNewTodoInput('')
  }


  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault()
          handleSubmitForm()
        }}
      >
        <input
          className="text-red"
          type="text" name="new-todo" id="new-todo"
          placeholder="new Todo..."
          value={newTodoInput}
          onChange={(event) => {
            setNewTodoInput(event.target.value)
          }}
        />
        <button>Create</button>
      </form>
    </div>
  )
}