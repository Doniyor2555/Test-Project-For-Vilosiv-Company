import prismadb from "../../lib/prismadb";

const getTodos = async () => {
  const todos = await prismadb.todo.findMany({});

  return todos;
};

export default getTodos;