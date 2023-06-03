import { ChangeEvent, useContext, useEffect, useState } from "react"

import { Todo } from './Todo'
import { CardsContext } from "@/utils/CardsContext";

export interface ItodoCard {
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

  const { cardsList, setCardsList } = useContext(CardsContext)



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
    if (tempTodoText !== '') {
      setCreateTodoCard((oldCreateTodoCard) => {
        const newTodoList = [...oldCreateTodoCard.todoList, tempTodoText]
        return { ...oldCreateTodoCard, todoList: newTodoList }
      })
      setTempTodoText('')
    }
    else {
      console.log('campo vazio')
    }
  }



  const delOfCard = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { value } = event.currentTarget

    setCreateTodoCard((oldCreateTodoCard) => {
      //create new array without the macthing "todo" using filter
      const newTodoList = oldCreateTodoCard.todoList.filter((item) => item !== value)
      return { ...oldCreateTodoCard, todoList: newTodoList }
    })

  }



  const createCard = () => {
    setCardsList((oldCardList) => [...oldCardList, createTodoCard])

    setCreateTodoCard({
      title: '',
      todoList: [],
      todoDoneList: []
    })
  }

  return (
    <div>
      <form className="w-[600px] relative mx-auto mt-8 rounded-lg bg-white p-2 shadow-[0_1px_7px_0px_rgba(0,0,0,0.5)]">
        <div className="flex mb-1">
          <input
            type="text"
            value={createTodoCard.title || ''}
            placeholder="Title"
            name="title"
            className="text-[20px] font-medium w-full p-1 border-none outline-none resize-none"
            onChange={(event) => { handleOnChange(event) }}
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault()
              }
            }}
          />

          <button
            className="float-right"
            onClick={(event) => {
              event.preventDefault()
              createCard()
            }}
          >✅
          </button>
        </div>


        <div className="flex flex-row w-full mt-1" >
          {
            tempTodoText ? (<input type="checkbox" name={tempTodoText} />) : null
          }

          <input
            type="text"
            name="content"
            value={tempTodoText}
            placeholder="Todo..."
            className="min-h-[40px] w-full p-1 border-none outline-none"
            onChange={(event) => { handleOnChange(event) }}
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault()
                addToCard()
              }
            }}
          />
        </div>


        {
          createTodoCard.todoList.map((item, index) => (
            <ul key={index}>
              <div className="flex flex-row justify-between">
                <Todo todoText={item} index={index} />

                <button
                  className="ml-2"
                  value={item}
                  onClick={(event) => {
                    event.preventDefault()
                    delOfCard(event)
                  }}
                >
                  ✖️
                </button>
              </div>
              <hr />
            </ul>
          ))
        }
      </form >
    </div >
  )
}