import { useEffect, useState } from "react"

import { v4 as uuidv4 } from "uuid"

interface TodoProps {
  todoText: string,
  index: number,
}

export function Todo(props: TodoProps) {
  const [todo, setTodo] = useState('')

  useEffect(() => {
    setTodo(props.todoText)
  }, [props.todoText])


  const todoId = uuidv4()


  if (!todo) {
    return null
  }

  return (
    <div>
      <div className="flex flex-row justify-between" key={props.index}>
        <div className="max-w-[200px] break-words">
          <input type="checkbox" name={todoId} id={todoId} />
          <label htmlFor={todoId} className="max-w-[200px]">
            {todo}
          </label>
        </div>

        <div className="ml-4 whitespace-nowrap">
        </div>
      </div>
    </div>
  )
}