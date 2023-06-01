import { Todo } from "./Todo"

export function Card() {
  return (
    <div className="flex flex-col w-[250px] relative mx-auto mt-8 rounded-lg bg-white p-2 shadow-[0_1px_7px_0px_rgba(0,0,0,0.5)]">
      <h1>My Tasks Title</h1>
      {/* <input type="checkbox" name="firstTaskName" id="firstTaskId" value="firstTaskValue" />
      <label htmlFor="firstTaskId">First Task</label>

      <input type="checkbox" name="2TaskName" id="2TaskId" value="2TaskValue" />
      <label htmlFor="2TaskId">Second Task</label>

      <input type="checkbox" name="3TaskName" id="3TaskId" value="3TaskValue" />
      <label htmlFor="3TaskId">3th Task</label>

      <input type="checkbox" name="4TaskName" id="4TaskId" value="4TaskValue" />
      <label htmlFor="4TaskId">4th Task</label> */}
      <Todo todoText={'primeiro todo'} index={1} /> <hr />
      <Todo todoText={'segundo todo'} index={2} />
      <Todo todoText={'terceiro todo'} index={3} />
      <Todo todoText={'quarto todo'} index={4} />
      <Todo todoText={'quinto todo'} index={5} />
      <Todo todoText={'sexto todo'} index={6} />
      <Todo todoText={'setimo todo'} index={7} />
      <Todo todoText={'oitavo todo'} index={8} />
      <Todo todoText={'nono todo'} index={9} />
      <Todo todoText={'decimoasdasadsdasdasdasdasd asasdasdprimeiro todo'} index={10} key={10} />
      <Todo todoText={'decimo segundo todo'} index={11} key={11} />
    </div>
  )
}