import { useEffect, useState } from "react"

import { Todo } from "./Todo"
import { ItodoCard } from "./CreateCardForm"

export function Cards() {
  const [cards, setCards] = useState<ItodoCard>({
    title: '',
    todoList: [],
    todoDoneList: []
  })

  useEffect(() => {

  }, [])

  const getDataFromStorage = () => {
    const storedCard = localStorage.getItem('cards')
    if (storedCard) {
      setCards(JSON.parse(storedCard))
    }
  }

  return (
    <div className="flex flex-col w-[250px] relative mx-auto mt-8 rounded-lg bg-white p-2 shadow-[0_1px_7px_0px_rgba(0,0,0,0.5)]">
      <h1>My Tasks Title</h1>
      {/* <input type="checkbox" name="firstTaskName" id="firstTaskId" value="firstTaskValue" />
      <label htmlFor="firstTaskId">First Task</label>

      <input type="checkbox" name="2TaskName" id="2TaskId" value="2TaskValue" />
      <label htmlFor="2TaskId">Second Task</label>

      <input type="checkbox" name="3TaskName" id="3TaskId" value="3TaskValue" />
      <label htmlFor="3TaskId">3th Task</label>

      <input type="checkbox" name="4TaskName" id="4TaskId" value="4TaskValue" />
      <label htmlFor="4TaskId">4th Task</label> */}

      {/* <Todo todoText={'primeiro todo'} index={1} /> <hr /> */}


    </div>
  )
}