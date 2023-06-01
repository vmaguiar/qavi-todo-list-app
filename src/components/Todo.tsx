import { useEffect, useState } from "react"

interface TodoProps {
  todoText: string,
  index: number
}

export function Todo(props: TodoProps) {
  const [todo, setTodo] = useState('')

  useEffect(() => {
    setTodo(props.todoText)
  }, [])

  const deleteTodo = () => {
    setTodo('')
  }



  if (!todo) {
    return null
  }

  return (
    <div className="flex flex-row justify-between" key={props.index}>
      <div>
        <input type="checkbox" name={todo} id={todo} />
        <label htmlFor={todo}> {todo} </label>
      </div>

      <div className="ml-4">
        <button
          className="mr-2"
        >
          Edit
        </button>
        <button
          className="ml-2"
          onClick={() => { deleteTodo() }}
        >
          Del
        </button>
      </div>
    </div>
  )
}