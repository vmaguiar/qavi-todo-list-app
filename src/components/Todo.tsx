import { useEffect, useState } from "react"

interface TodoProps {
  todoText: string,
  index: number,
}

export function Todo(props: TodoProps) {
  const [todo, setTodo] = useState('')

  useEffect(() => {
    setTodo(props.todoText)
  }, [props.todoText])

  const deleteTodo = () => {
    setTodo('')
  }



  if (!todo) {
    return null
  }

  return (
    <div>
      <div className="flex flex-row justify-between" key={props.index}>
        <div className="max-w-[200px] break-words">
          <input type="checkbox" name={todo} id={todo} />
          <label htmlFor={todo} className="max-w-[200px]"> {todo} </label>
        </div>

        <div className="ml-4 whitespace-nowrap">
          {/* <button
            className="mr-2 "
          >
            Edit
          </button> */}
          {/* <button
            className="ml-2"
            onClick={() => { deleteTodo() }}
          >
            ✖️
          </button> */}
        </div>
      </div>
      {/* <hr /> */}
    </div>
  )
}