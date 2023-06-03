'use client'

import { Header } from "../components/Header"
import { CreateCardForm } from "@/components/CreateCardForm"
import { Cards } from "../components/Cards"
import { CardsProvider } from "@/utils/CardsContext"

// interface ItodoCard {
//   title: string,
//   todoList: string[],
//   todoDoneList: string[]
// };

export default function Home() {

  return (
    <div className="min-h-screen">
      <Header />
      <CardsProvider>
        <CreateCardForm />
        <div className="grid grid-flow-row grid-cols-5 gap-4 my-8">
          <Cards />
        </div>
      </CardsProvider>
    </ div >
  )
};
