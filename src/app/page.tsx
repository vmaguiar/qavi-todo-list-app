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

  const [tempTodoText, setTempTodoText] = useState([]);


  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {value, name} = event.target;
    // console.log(name);

    if(name === 'title') {
      setTodoCard((oldTodoCard) => {
        const newTodoList = {...oldTodoCard, title: value}
        console.log(`entrou no title => ${newTodoList}`);
        return newTodoList;
      })
    }

    else if(name === 'singletodoText') {
      console.log('entrou no todo list')
      setTodoCard((oldTodoCard) => {
        const newTodoCard = {...oldTodoCard, todoList: [value]}
        return newTodoCard
      })
    }
  };


  return (
    <div className="min-h-screen">
      <header className="min-w-full flex items-center justify-evenly pt-16">
        <h1 className="text-3xl font-bold">To do List</h1>
        <p>Made by: @vmaguiar</p>
      </header>

      <main className="flex flex-col items-center justify-between my-16">
        <div className="flex flex-col items-center w-2/4 rounded-md border-solid border-2 border-gray-700 p-6">
          <p>add title</p>
          <input
            type="text"
            name="title"
            placeholder="Add a Title"
            className="w-10/12 rounded-md"
            onChange={(event) => { handleOnChange(event)}}
          />
          <p>add todo</p>
          <input
            type="text"
            name="singletodoText"
            placeholder="Add Todo"
            className="w-10/12 rounded-md"
            onChange={(event) => { handleOnChange(event)}}/>
        </div>
      
        {/* Container with all to do cards */}
        <div className="grid grid-flow-col auto-cols-fr gap-4 my-8">
          <Todo />
          <Todo />
          <Todo />
          <Todo />
          <Todo />
          <Todo />
          <Todo />
          <Todo />
          <Todo />
          <Todo />
          <Todo />
          <Todo />
          <Todo />
          <Todo />
          <Todo />
          <Todo />
          <Todo />
        </div>
      </main>
    </ div>
  )
};
