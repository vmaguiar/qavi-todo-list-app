import { useContext, useEffect, useState } from "react"

import { Todo } from "./Todo"
import { ItodoCard } from "./CreateCardForm"
import { CardsContext } from "@/utils/CardsContext"

export function Cards() {
  const { cardsList, setCardsList } = useContext(CardsContext)

  const deleteCard = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log('Deletou Card')
    const { value } = event.currentTarget
  }

  const editCard = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log('entrou no Edit Mode')
  }

  return (
    <>
      {
        cardsList.map((item: ItodoCard, index: number) => (
          <div className="flex flex-col w-[250px] relative mx-auto mt-8 rounded-lg bg-white p-2 shadow-[0_1px_7px_0px_rgba(0,0,0,0.5)]"
            key={index}
          >
            <div className="flex flex-row justify-between">
              <h1>{item.title}</h1>

              <div>
                <button onClick={(event) => { editCard(event) }}>
                  📝
                </button>

                <button onClick={(event) => {
                  deleteCard(event)
                }}>
                  ✖️
                </button>
              </div>
            </div>
            {
              item.todoList.map((todoItem, todoIndex) => (
                <div key={todoIndex}>
                  < Todo todoText={todoItem} index={todoIndex} />
                  <hr />
                </div>
              ))
            }
          </div >
        ))
      }
    </>
  )
}