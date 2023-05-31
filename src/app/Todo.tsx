interface TodoProps {
  todoText: string,
  index: number
}

export function Todo(props: TodoProps) {
  return (
    <div className="flex flex-row justify-between" key={props.index}>
      <div>
        <input type="checkbox" name={props.todoText} id={props.todoText} />
        <label htmlFor={props.todoText}> {props.todoText} </label>
      </div>

      <div className="ml-4">
        <button
          className="mr-2"
        >
          Edit
        </button>
        <button
          className="ml-2"
        // onClick={(event) => { deleteTodoItem(event) }}
        >
          Del
        </button>
      </div>
    </div>
  )
}