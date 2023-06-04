import React, { useContext, useEffect, useState } from "react"

import { Todo } from "./Todo"
import { ItodoCard } from "./CreateCardForm"
import { CardsContext } from "@/utils/CardsContext"
import { SearchBar } from "./SearchBar"

export function Cards() {
  const { cardsList, setCardsList } = useContext(CardsContext)
  const [editCard, setEditCard] = useState<ItodoCard | null>(null)
  const [editCardTitle, setEditCardTitle] = useState('')
  const [newTodo, setNewTodo] = useState<string[]>([])
  const [tempNewTodo, setTempNewTodo] = useState('')
  const [selectedCards, setSelectedCards] = useState<ItodoCard[] | null>(null)
  const [filterdCards, setFilteredCards] = useState<ItodoCard[] | null>(null)


  useEffect(() => {
    if (selectedCards !== null) {
      setFilteredCards(selectedCards)
    }
  }, [selectedCards])



  // Function thats delete a single Card from the Cards list
  const deleteCard = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, card: ItodoCard) => {
    setCardsList((oldCardList) => {
      const newCardsList = oldCardList.filter((item) => item.title !== card.title)
      localStorage.setItem('cards', JSON.stringify(newCardsList))
      return newCardsList
    })
  }

  // Function thats enable the card be edited
  const editCardFunc = (card: ItodoCard) => {
    setEditCard(card)
    setEditCardTitle(card.title)
    setNewTodo([...card.todoList])
  }


  // Function thats Update todo's in a Card
  const handleTodoChange = (event: React.ChangeEvent<HTMLInputElement>, todoIndex: number) => {
    setNewTodo((prevTodos) => {
      const updatedTodos = [...prevTodos]
      updatedTodos[todoIndex] = event.target.value
      return updatedTodos
    });
  }

  // Function thats add a todo to a card that is beign edited
  const addNewTodo = () => {
    if (tempNewTodo !== '') {
      setNewTodo((prevTodos) => [...prevTodos, tempNewTodo])
      setTempNewTodo('')
    } else {
      alert('Campo em branco')
    }
  }


  // Function thats delete a single todo from the card thats being edited
  const deleteTodo = (todoIndex: number) => {
    if (editCard) {
      setNewTodo((oldList) => {
        const updatedList = oldList.filter((_, index) => index !== todoIndex)
        return updatedList
      })
    }
  }


  // Function that ends the "editCard" and saves all the new data in that card that was being edited
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


  //Function that find the card with matching data from SearchBar input
  const searchCard = (searchQuery: string) => {
    const foundCards = cardsList.filter((card) => {
      return (
        card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.todoList.some((todo) => todo.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    })

    setSelectedCards(foundCards || null)
  }

  console.log(filterdCards)

  return (
    <>
      <SearchBar onSearch={searchCard} />

      {
        editCard ?
          (
            <div className="grid grid-flow-row grid-cols-5 gap-4 my-8">
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
            </div>
          ) :
          (
            filterdCards ? (
              <div className="grid grid-flow-row grid-cols-5 gap-4 my-8">
                {
                  filterdCards.map((item: ItodoCard, index: number) => (
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
                }
              </div>
            ) :
              (
                <div className="grid grid-flow-row grid-cols-5 gap-4 my-8">
                  {
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
                  }
                </div >
              )
          )
      }
    </>
  )
}
