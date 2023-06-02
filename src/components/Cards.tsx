import { useContext, useEffect, useState } from "react"

import { Todo } from "./Todo"
import { ItodoCard } from "./CreateCardForm"
import { CardsContext } from "@/utils/CardsContext"

export function Cards() {
  const { cardsList, setCardsList } = useContext(CardsContext)

  // useEffect(() => {
  //   const storedCard = localStorage.getItem('cards')
  //   if (storedCard) {
  //     setCardsList(JSON.parse(storedCard))
  //   }
  // }, [])

  return (
    <>
      {
        cardsList.map((item: ItodoCard, index: number) => (
          <div className="flex flex-col w-[250px] relative mx-auto mt-8 rounded-lg bg-white p-2 shadow-[0_1px_7px_0px_rgba(0,0,0,0.5)]"
            key={index}
          >
            <h1>{item.title}</h1>
            {
              item.todoList.map((todoItem, todoIndex) => (
                <Todo todoText={todoItem} index={todoIndex} key={todoIndex} />
              ))
            }
          </div>
        ))
      }
    </>
  )
}