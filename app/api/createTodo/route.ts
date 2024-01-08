import { NextResponse } from "next/server";
import prismadb from "../../lib/prismadb";

export async function POST(req: Request) {
  const body = await req.json();

  const { title, status, todo } = body;

  const createTodo = await prismadb.todo.create({
    data: {
      title,
      status,
      todo,
    },
  });

  return NextResponse.json(createTodo);
}
