import { z } from "zod"

import type { inferRouterOutputs } from "@trpc/server"
import type { AppRouter } from "./server/api/root"

//Todo component type 
type RouterOutputs = inferRouterOutputs<AppRouter>
type allTodoOutputs = RouterOutputs["todo"]["getAllTodos"]
export type Todo = allTodoOutputs[number]

//todo router input type as a constant
export const todoInput = z
  .string(
    {
      required_error: "Describe your todo"
    }).min(1).max(50)