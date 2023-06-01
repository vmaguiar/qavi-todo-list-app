
export function CreateCardForm() {

  const createCheckInput = () => {


  }

  return (
    <div>
      <form className="w-[600px] relative mx-auto mt-8 rounded-lg bg-white p-2 shadow-[0_1px_7px_0px_rgba(0,0,0,0.5)]">
        <input type="text" placeholder="Title" name="title" className="w-full mb-1 p-1 border-none outline-none resize-none" />
        <p className="w-full mt-1">
          <input
            name="content"
            placeholder="Todo..."
            className="min-h-[40px] w-full p-1 border-none outline-none"
            onChange={() => { createCheckInput() }}
          />
          {/* <label htmlFor="todo1">
            todo1
          </label> */}
        </p>
      </form>
    </div >
  )
}