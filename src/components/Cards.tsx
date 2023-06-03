import { use, useContext, useEffect, useState } from "react"

import { Todo } from "./Todo"
import { ItodoCard } from "./CreateCardForm"
import { CardsContext } from "@/utils/CardsContext"

export function Cards() {
  const { cardsList, setCardsList } = useContext(CardsContext)
  const [editCard, setEditCard] = useState<ItodoCard | null>(null)


  const deleteCard = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, card: ItodoCard) => {
    // console.log(card)
    // console.log(event.target)

    setCardsList((oldCardList) => {
      const newCardsList = oldCardList.filter((item) => item.title !== card.title)
      localStorage.setItem('cards', JSON.stringify(newCardsList))
      return newCardsList
    })
  }


  const asosa = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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
                <button onClick={(event) => { asosa(event) }}>
                  📝
                </button>

                <button onClick={(event) => {
                  deleteCard(event, item)
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