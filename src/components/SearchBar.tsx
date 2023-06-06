import { api } from "~/utils/api"
import { Todo } from "./Todo"
import { useState } from "react"


export function SearchBar() {
  const [tempsearchText, setTempSearchText] = useState('')
  const [searchText, setSearchText] = useState('')


  const { data: todos, isLoading, isError } = api.todo.findTodo.useQuery(searchText)

  if (isLoading) {
    return (
      <>
        <form
          className="w-[600px] relative mx-auto mt-4 rounded-lg bg-white text-black p-2 shadow-[0_1px_7px_0px_rgba(0,0,0,0.5)]"
          onSubmit={(event) => {
            event.preventDefault()
            setSearchText(tempsearchText)
            setTempSearchText('')
          }}
        >
          <div className="flex flex-row">
            <input
              type="text"
              placeholder="Search for..."
              className="text-[16px] font-medium w-full p-1 border-none outline-none resize-none"
              onChange={(event) => setTempSearchText(event.target.value)}
            />

            <button type="submit">
              🔎
            </button>
          </div>
        </form>
        <div>🔄 Loading Todos... 🔄</div>
      </>
    )
  }

  if (isError) {
    return (
      <>
        <form
          className="w-[600px] relative mx-auto mt-4 rounded-lg bg-white text-black p-2 shadow-[0_1px_7px_0px_rgba(0,0,0,0.5)]"
          onSubmit={(event) => {
            event.preventDefault()
            setSearchText(tempsearchText)
            setTempSearchText('')
          }}
        >
          <div className="flex flex-row">
            <input
              type="text"
              placeholder="Search for..."
              className="text-[16px] font-medium w-full p-1 border-none outline-none resize-none"
              onChange={(event) => setTempSearchText(event.target.value)}
            />

            <button type="submit">
              🔎
            </button>
          </div>
        </form>
        <div>
          ...Search Todo's not found...
        </div >
      </>
    )
  }

  return (
    <>
      <form
        className="w-[600px] relative mx-auto mt-4 rounded-lg bg-white text-black p-2 shadow-[0_1px_7px_0px_rgba(0,0,0,0.5)]"
        onSubmit={(event) => {
          event.preventDefault()
          setSearchText(tempsearchText)
          setTempSearchText('')
        }}
      >
        <div className="flex flex-row">
          <input
            type="text"
            placeholder="Search for..."
            className="text-[16px] font-medium w-full p-1 border-none outline-none resize-none"
            onChange={(event) => setTempSearchText(event.target.value)}
          />

          <button type="submit">
            🔎
          </button>
        </div>
      </form>

      <div>
        {
          todos.length ? (todos.map((todo) => {
            console.log(todos)
            return (
              <Todo key={todo.id} todo={todo} />
            )
          })) :
            `Nothing found...${console.log(todos)}`
        }
      </div>
    </>
  )
}