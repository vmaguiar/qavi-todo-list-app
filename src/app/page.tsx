'use client'

import { useState } from "react"

import { Todo } from "./Todo"


export default function Home() {
  const [todoList, setTodoList] = useState([])

  return (
    <div className="min-h-screen">
      <header className="min-w-full flex items-center justify-evenly pt-16">
        <h1 className="text-3xl font-bold">To do List</h1>
        <p>Made by: @vmaguiar</p>
      </header>

    <main className="flex flex-col items-center justify-between my-16">
      <div className="flex flex-col items-center w-2/4 rounded-md border-solid border-2 border-gray-900 p-6">
        <p>add title</p>
        <input type="text" className="w-2/3"/>
        <p>add tasks</p>
        <input type="text" className="w-full"/>
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
}
