import type { Todo } from "~/types";


type TodoProps = {
  todo: Todo
}
export function Todo({ todo }: TodoProps) {
  const { id, todoText, checked } = todo


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