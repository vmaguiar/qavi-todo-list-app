import React, { useContext, useEffect, useState } from "react"

import { Todo } from "./Todo"
import { ItodoCard } from "./CreateCardForm"
import { CardsContext } from "@/utils/CardsContext"

export function Cards() {
  const { cardsList, setCardsList } = useContext(CardsContext)
  const [editCard, setEditCard] = useState<ItodoCard | null>(null)
  const [editCardTitle, setEditCardTitle] = useState('')


  const deleteCard = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, card: ItodoCard) => {
    // console.log(card)
    // console.log(event.target)

    setCardsList((oldCardList) => {
      const newCardsList = oldCardList.filter((item) => item.title !== card.title)
      localStorage.setItem('cards', JSON.stringify(newCardsList))
      return newCardsList
    })
  }


  const editCardFunc = (card: ItodoCard) => {
    setEditCard(card)
    setEditCardTitle(card.title)
  }


  const handleTodoChange = (event: React.ChangeEvent<HTMLInputElement>, todoIndex: number) => {
    const newCardList = [...cardsList]
    newCardList.forEach((card) => {
      if (card === editCard) {
        card.todoList[todoIndex] = event.target.value
      }
    })
    setCardsList(newCardList)
  }


  const saveEdit = () => {
    // setEditCard((oldCard) => {
    //   if (oldCard) {
    //     oldCard.title = editCardTitle
    //   }
    //   return oldCard
    // })
    // setEditCardTitle('')
    // localStorage.setItem('cards', JSON.stringify(cardsList))

    setCardsList((oldCardsList) => {
      const updatedList = oldCardsList.map((card) => {
        if (card === editCard) {
          return { ...card, title: editCardTitle };
        }
        return card;
      });
      localStorage.setItem('cards', JSON.stringify(updatedList));
      return updatedList;
    });
    setEditCard(null);
    setEditCardTitle('');
  }


  return (
    <>
      {
        editCard ?
          (
            <div className="col-span-5 flex flex-col w-[600px] relative mx-auto mt-8 rounded-lg bg-white p-2 shadow-[0_1px_7px_0px_rgba(0,0,0,0.5)]">
              <input
                className="text-[20px] font-medium"
                type="text"
                value={editCardTitle}
                onChange={(event) => setEditCardTitle(event.target.value)}
              />
              {editCard.todoList.map((todoItem, todoIndex) => (
                <div key={todoIndex}>
                  <input
                    type="text"
                    value={todoItem}
                    onChange={(event) => handleTodoChange(event, todoIndex)}
                  />
                </div>
              ))}
              <button onClick={saveEdit}>Save</button>
            </div>
          ) :
          (
            cardsList.map((item: ItodoCard, index: number) => (
              <div className="flex flex-col w-[250px] relative mx-auto mt-8 rounded-lg bg-white p-2 shadow-[0_1px_7px_0px_rgba(0,0,0,0.5)]"
                key={index}
              >
                <div className="flex flex-row justify-between">
                  <h1 className="text-[20px] font-medium">{item.title}</h1>

                  <div>
                    <button onClick={() => editCardFunc(item)}>
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
          )
        //   cardsList.map((item: ItodoCard, index: number) => (
        // <div className="flex flex-col w-[250px] relative mx-auto mt-8 rounded-lg bg-white p-2 shadow-[0_1px_7px_0px_rgba(0,0,0,0.5)]"
        //   key={index}
        // >
        //   <div className="flex flex-row justify-between">
        //     <h1>{item.title}</h1>

        //     <div>
        //       <button onClick={(event) => { asosa(event) }}>
        //         📝
        //       </button>

        //       <button onClick={(event) => {
        //         deleteCard(event, item)
        //       }}>
        //         ✖️
        //       </button>
        //     </div>
        //   </div>
        //   {
        //     item.todoList.map((todoItem, todoIndex) => (
        //       <div key={todoIndex}>
        //         < Todo todoText={todoItem} index={todoIndex} />
        //         <hr />
        //       </div>
        //     ))
        //   }
        // </div >
        // ))
      }
    </>
  )
}