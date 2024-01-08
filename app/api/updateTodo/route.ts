import prismadb from '../../lib/prismadb';
import { NextResponse } from 'next/server';


export async function POST(req: Request) {
  const body = await req.json();

  const {id, title, status, todo} = body;

  const updateTodo = await prismadb.todo.update({
    where: {
      id: id
    },
    data: {
      title,
      status,
      todo
    }
  })

  return NextResponse.json(updateTodo)
}