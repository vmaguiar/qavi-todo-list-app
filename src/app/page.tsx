'use client'

import { ChangeEvent, useState } from "react"

import { Todo } from "./Todo"

interface ItodoCard {
  title: string,
  todoList: string[],
  todoDoneList: string[]
};

export default function Home() {
  const [todoCard, setTodoCard] = useState<ItodoCard>({
    title: '',
    todoList: [],
    todoDoneList: []
  });

  const [tempTodoText, setTempTodoText] = useState('');

  const [cardsList, setCardsList] = useState<ItodoCard[]>([])


  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    // console.log(name);

    if (name === 'title') {
      setTodoCard((oldTodoCard) => {
        const newTodoList = { ...oldTodoCard, title: value }
        return newTodoList;
      })
    }

    else if (name === 'singletodoText') {
      setTempTodoText(value)
    }
  };

  const handleOnClick = () => {
    setTodoCard((oldTodoCard) => {
      oldTodoCard.todoList.push(tempTodoText)
      return { ...oldTodoCard }
    })
    setTempTodoText('')
  }

  const createCard = () => {
    setCardsList((oldCardsList) => {
      const newCardsList = [...oldCardsList, todoCard]
      return newCardsList
    })
    setTodoCard({
      title: '',
      todoList: [],
      todoDoneList: []
    })
  }

  // const deleteTodoItem = (event) => {
  //   console.log(event)
  // }


  return (
    <div className="min-h-screen">
      <header className="min-w-full flex items-center justify-evenly pt-16">
        <h1 className="text-4xl font-bold">To do List</h1>
        <p>Made by: @vmaguiar</p>
      </header>


      <main className="flex flex-col items-center justify-between my-16">
        <div className="flex flex-col items-center w-2/4 rounded-md border-solid border-2 border-gray-400 p-6 bg-white">
          <p>Title</p>
          <input
            type="text"
            name="title"
            value={todoCard.title}
            placeholder="Add a Title"
            className="w-10/12 rounded-md mt-1 outline outline-1 outline-gray-300"
            onChange={(event) => { handleOnChange(event) }}
          />

          <p className="mt-6">What do I have to do?</p>
          <input
            type="text"
            name="singletodoText"
            value={tempTodoText}
            placeholder="Add Todo"
            className="w-10/12 rounded-md mt-1 outline outline-1 outline-gray-300"
            onChange={(event) => { handleOnChange(event) }} />



          <div className="flex justify-center w-full">
            <button
              className="w-1/4 rounded-md border-solid border-2 border-gray-400 mt-4 mr-2 p-1"
              onClick={() => { handleOnClick() }}
            >
              Add
            </button>

            <button
              className="w-1/4 rounded-md border-solid border-2 border-gray-400 mt-4 ml-2 p-1"
              onClick={() => { createCard() }}
            >
              Create Card
            </button>
          </div>


          <h1 className="text-2xl font-normal mt-4 mb-2">{todoCard.title}</h1>
          <div className="flex flex-col justify-items-start border-solid border-gray-600">
            {
              todoCard.todoList.map((item, index) => (
                <Todo todoText={item} index={index} />
              ))
            }
          </div>
        </div>

        {/* Container with all to do cards */}
        <div className="grid grid-flow-col auto-cols-fr gap-4 my-8">
        </div>
      </main>
    </ div>
  )
};
