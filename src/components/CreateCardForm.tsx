import { ChangeEvent, useState } from "react"

import { Todo } from './Todo'

interface ItodoCard {
  title: string,
  todoList: string[],
  todoDoneList: string[]
}

export function CreateCardForm() {
  const [createTodoCard, setCreateTodoCard] = useState<ItodoCard>({
    title: '',
    todoList: [],
    todoDoneList: []
  })

  const [tempTodoText, setTempTodoText] = useState('');


  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    if (name === 'title') {
      setCreateTodoCard((oldCreateTodoCard) => {
        const newTitle = { ...oldCreateTodoCard, title: value }
        return newTitle;
      })
    }

    else if (name === 'content') {
      setTempTodoText(value)
    }
  };

  const addToCard = () => {
    if (tempTodoText) {
      setCreateTodoCard((oldCreateTodoCard) => {
        oldCreateTodoCard.todoList.push(tempTodoText)
        return { ...oldCreateTodoCard }
      })
      setTempTodoText('')
    }
  }


  return (
    <div>
      <form className="w-[600px] relative mx-auto mt-8 rounded-lg bg-white p-2 shadow-[0_1px_7px_0px_rgba(0,0,0,0.5)]">
        <input
          type="text"
          placeholder="Title"
          name="title"
          className="w-full mb-1 p-1 border-none outline-none resize-none"
          onChange={(event) => { handleOnChange(event) }}
        />
        <div className="flex flex-row w-full mt-1">
          <input type="checkbox" name={tempTodoText} />
          <input
            type="text"
            name="content"
            placeholder="Todo..."
            className="min-h-[40px] w-full p-1 border-none outline-none"
            onChange={(event) => { handleOnChange(event) }}
            onKeyPress={(event) => {
              if (event.key === 'Enter') { addToCard() }
            }}
          />

          {
            createTodoCard.todoList.map((item, index) => (
              <Todo todoText={item} index={index} key={index} />
            ))
          }


          {/* <label htmlFor="todo1">
            todo1
          </label> */}
        </div>
      </form>
    </div >
  )
}