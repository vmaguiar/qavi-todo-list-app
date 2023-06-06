import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import { searchTodoInput, todoInput } from "~/types";


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


  updateTodo: publicProcedure
    .input(z.object({
      id: z.string(),
      todoText: todoInput
    }))
    .mutation(async ({ ctx, input: { id, todoText } }) => {
      return ctx.prisma.todo.update({
        where: {
          id: id
        },
        data: {
          todoText: todoText
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


  findTodo: publicProcedure
    .input(searchTodoInput)
    .query(async ({ ctx, input }) => {
      // const todos = await ctx.prisma.todo.findMany()
      // return todos.map(({ id, todoText, checked }) => ({ id, todoText, checked }))
      return ctx.prisma.todo.findMany({
        select: {
          id: true,
          todoText: true,
          checked: true
        },
        where: {
          todoText: {
            contains: input
          }
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
