import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import { todoInput } from "~/types";


export const todoRouter = createTRPCRouter({
  getAllTodos: publicProcedure.query(async ({ ctx }) => {
    const todos = await ctx.prisma.todo.findMany()
    return todos.map(({ id, todoText, checked }) => ({ id, todoText, checked }))
  }),

  createTodo: publicProcedure
    .input(todoInput)
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.todo.create({
        data: {
          todoText: input,
        }
      })
    }),

  deleteTodo: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.todo.delete({
        where: {
          id: input
        }
      })
    }),

  toggleCheckedTodo: publicProcedure
    .input(z.object({
      id: z.string(),
      checked: z.boolean()
    }))
    .mutation(async ({ ctx, input: { id, checked } }) => {
      return ctx.prisma.todo.update({
        where: {
          id: id
        },
        data: {
          checked: checked,
        }
      })
    })
});
