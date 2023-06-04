
import React, { createContext, useState, useEffect, ReactNode } from "react"

interface ItodoCard {
  title: string,
  todoList: string[],
  todoDoneList: string[]
}

interface CardsContexProps {
  cardsList: ItodoCard[],
  setCardsList: React.Dispatch<React.SetStateAction<ItodoCard[]>>

}

export const CardsContext = createContext<CardsContexProps>({
  cardsList: [],
  setCardsList: () => { },
})

interface CardsProviderProps {
  children: ReactNode
}

export const CardsProvider: React.FC<CardsProviderProps> = ({ children }) => {
  const [cardsList, setCardsList] = useState<ItodoCard[]>([])

  //get data that was storage before
  useEffect(() => {
    const storageCardsList = localStorage.getItem("cards")
    if (storageCardsList) {
      setCardsList(JSON.parse(storageCardsList))
    }
  }, [])

  //set the submitted data to localstorage
  useEffect(() => {
    if (cardsList.length > 0) {
      localStorage.setItem("cards", JSON.stringify(cardsList))
    }
  }, [cardsList])

  return (
    <CardsContext.Provider value={{ cardsList, setCardsList }}>
      {children}
    </CardsContext.Provider>
  )
}