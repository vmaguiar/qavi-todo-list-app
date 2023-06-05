import { boolean, z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const todoRouter = createTRPCRouter({
  getfakeAllTodo: publicProcedure.query(({ ctx }) => {
    return [
      {
        id: `fake id`,
        todoText: `fake todoText`,
        checked: false,
      },
      {
        id: `second fake id`,
        todoText: `second fake todoText `,
        checked: true,
      }
    ];
  }),

  getAllTodos: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.todo.findMany();
  }),

  createTodo: publicProcedure
    .input(z.string({ required_error: "Describe your todo" }).min(1).max(30))
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
