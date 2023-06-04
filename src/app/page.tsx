'use client'

import { Header } from "../components/Header"
import { CardsProvider } from "@/utils/CardsContext"
import { CreateCardForm } from "@/components/CreateCardForm"
import { Cards } from "../components/Cards"



export default function Home() {

  return (
    <div className="min-h-screen">
      <Header />
      <CardsProvider>
        <CreateCardForm />
        <Cards />
      </CardsProvider>
    </ div >
  )
};
