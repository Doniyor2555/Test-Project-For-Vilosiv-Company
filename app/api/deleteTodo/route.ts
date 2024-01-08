import { NextResponse } from "next/server";
import prismadb from "../../lib/prismadb";

export async function POST(req: Request) {
  const body = await req.json();

  const {id} = body;

  if (!id) {
    return;
  }

  const deleteTod = await prismadb.todo.delete({
    where: {
      id: id
    }
  })

  return NextResponse.json(deleteTod)
}