import React, { useContext, useEffect, useState } from "react"

import { Todo } from "./Todo"
import { ItodoCard } from "./CreateCardForm"
import { CardsContext } from "@/utils/CardsContext"

export function Cards() {
  const { cardsList, setCardsList } = useContext(CardsContext)
  const [editCard, setEditCard] = useState<ItodoCard | null>(null)
  const [editCardTitle, setEditCardTitle] = useState('')
  const [newTodo, setNewTodo] = useState<string[]>([])
  const [tempNewTodo, setTempNewTodo] = useState('')



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
    setNewTodo([...card.todoList])
  }


  const handleTodoChange = (event: React.ChangeEvent<HTMLInputElement>, todoIndex: number) => {
    //   const newCardList = [...cardsList]
    //   newCardList.forEach((card) => {
    //     if (card === editCard) {
    //       card.todoList[todoIndex] = event.target.value
    //     }
    //   })
    //   setCardsList(newCardList)
    // }
    setNewTodo((prevTodos) => {
      const updatedTodos = [...prevTodos]
      updatedTodos[todoIndex] = event.target.value
      return updatedTodos
    });
  }


  const addNewTodo = () => {
    if (tempNewTodo !== '') {
      setNewTodo((prevTodos) => [...prevTodos, tempNewTodo])
      setTempNewTodo('')
    } else {
      alert('Campo em branco')
    }
  }



  const deleteTodo = (todoIndex: number) => {
    if (editCard) {
      setNewTodo((oldList) => {
        const updatedList = oldList.filter((_, index) => index !== todoIndex)
        return updatedList
      })


      // setEditCard((oldCard) => {
      //   if (oldCard) {
      //     const updatedTodoList = oldCard.todoList.filter((_, index) => index !== todoIndex)
      //     setNewTodo(updatedTodoList)
      //     return { ...oldCard, todoList: updatedTodoList }
      //   }
      //   return oldCard
      // })
    }
  }


  const saveEdit = () => {
    setCardsList((oldCardsList) =>
      oldCardsList.map((card) => {
        if (card === editCard) {
          return { ...card, title: editCardTitle, todoList: [...newTodo] }
        }
        return card
      })
    );

    setEditCard(null)
    setEditCardTitle('')
    setNewTodo([])
  };



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


              {newTodo.map((todoItem, todoIndex) => (
                <div key={todoIndex}>
                  <input
                    type="text"
                    value={todoItem}
                    onChange={(event) => handleTodoChange(event, todoIndex)}
                  />
                  <button onClick={() => deleteTodo(todoIndex)}>✖️</button>
                </div>
              ))}


              <input
                type="text"
                name="content"
                value={tempNewTodo}
                placeholder="New Todo..."
                className="min-h-[40px] w-full p-1 border-none outline-none"
                onChange={(event) => { setTempNewTodo(event.currentTarget.value) }}
                onKeyPress={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault()
                    addNewTodo()
                  }
                }}
              />

              <div className="flex justify-between">
                <button onClick={addNewTodo}>Add Todo</button>
                <button onClick={saveEdit}>Save</button>
              </div>
            </div>
          ) :
          (
            cardsList.map((item: ItodoCard, index: number) => (
              <div className="flex flex-col max-h-[200px] w-[250px] relative mx-auto mt-8 rounded-lg bg-white p-2 shadow-[0_1px_7px_0px_rgba(0,0,0,0.5)]"
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
                <div className="overflow-y-auto">
                  {
                    item.todoList.map((todoItem, todoIndex) => (
                      <div key={todoIndex}>
                        < Todo todoText={todoItem} index={todoIndex} />
                        <hr />
                      </div>
                    ))
                  }
                </div>
              </div >
            ))
          )
      }
    </>
  )
}
