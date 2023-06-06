import { useState } from "react";
import { toast } from "react-hot-toast";

import { Todo, todoInput } from "~/types";
import { api } from "~/utils/api";


type TodoProps = {
  todo: Todo
}

export function Todo({ todo }: TodoProps) {
  const { id, todoText, checked } = todo

  const [updateMode, setUpdateMode] = useState(false)
  const [updateText, setUpdateText] = useState('')


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

  const { mutate: updateMutation } = api.todo.updateTodo.useMutation({
    onSettled: async () => {
      await trpc.todo.getAllTodos.invalidate()
    }
  })

  const handleUpdateSubmit = (id: string) => {
    const result = todoInput.safeParse(updateText)
    if (!result.success) {
      toast.error(result.error.format()._errors.join())
      return
    }
    updateMutation({ id, todoText: updateText })
    setUpdateText('')
    setUpdateMode(false)
  }

  return (
    <>
      <div className="w-full flex flex-row justify-between mb-1 mt-1" key={id}>
        {
          updateMode ? (
            <>
              <div className="w-3/4 break-words">
                <form
                  onSubmit={(event) => {
                    event.preventDefault()
                    handleUpdateSubmit(id)
                  }}
                >
                  <input
                    className="cursor-pointer mr-1"
                    checked={checked}
                    type="checkbox" name={id} id={id}
                    onChange={(event) => { checkedMutation({ id, checked: event.target.checked }) }}
                  />

                  <input
                    className={`w-3/4 ml-1 outline-none ${checked ? 'line-through' : ''}`}
                    type="text" name={id} id={id} value={updateText}
                    onChange={(event) => { setUpdateText(event.target.value) }}
                  />
                </form>
              </div >

              <div>
                <button onClick={() => {
                  deleteMutation(id)
                }}>
                  ✖
                </button>
              </div>
            </>

          ) :
            (
              <>
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
                </div >

                <div>
                  <button onClick={(event) => {
                    setUpdateMode(true)
                    setUpdateText(todoText)
                  }}>
                    📝
                  </button>

                  <button onClick={() => {
                    deleteMutation(id)
                  }}>
                    ✖
                  </button>
                </div>
              </>

            )
        }
      </div >
      <hr />
    </>
  )
}