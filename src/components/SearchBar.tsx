import { useState } from "react"

interface SearchBarProps {
  onSearch: (searchQuery: string) => void
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('')


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSearch(searchQuery)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.currentTarget.value)
  }

  return (
    <>
      <form
        className="w-[600px] relative mx-auto mt-8 rounded-lg bg-white p-2 shadow-[0_1px_7px_0px_rgba(0,0,0,0.5)]"
        onSubmit={(event) => handleSubmit(event)}
      >
        <div className="flex flex-row">
          <input
            type="text"
            placeholder="Search for..."
            name="searchQuery"
            value={searchQuery}
            className="text-[16px] font-medium w-full p-1 border-none outline-none resize-none"
            onChange={(event) => handleInputChange(event)}
          />

          <button type="submit">
            🔎
          </button>
        </div>
      </form>
    </>
  )
}