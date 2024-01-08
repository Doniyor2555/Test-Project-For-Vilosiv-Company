import { Empty } from 'antd';

import CardList from "./components/cardList";
import CustomDropDown from "./components/customDropdown";
import Header from "./components/header";

import getTodos from "./hooks/getTodos";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const todos = await getTodos();
  // @ts-ignore
  const params: string = searchParams["search"] ?? "";

  const filterByStatus: any = searchParams["filterByStatus"] ?? "";

  const filterBySearchValue = params
    ? todos.filter((item) =>
        item.title?.toLocaleLowerCase()?.includes(params.toLowerCase())
      )
    : filterByStatus === "Done"
    ? todos.filter((item) =>
        item.status.toLocaleLowerCase().includes(filterByStatus.toLowerCase())
      )
    : filterByStatus === "In Progress"
    ? todos.filter((item) =>
        item.status.toLocaleLowerCase().includes(filterByStatus.toLowerCase())
      )
    : filterByStatus === "Waiting for execution"
    ? todos.filter((item) =>
        item.status.toLocaleLowerCase().includes(filterByStatus.toLowerCase())
      )
    : filterByStatus === "All"
    ? todos.filter((item) => item)
    : todos.filter((item) => item);

  return (
    <div>
      <Header />
      <div className="pr-[64px]">
        <CustomDropDown />
      </div>
      <div className="flex items-center gap-1 flex-wrap">
        {todos.length > 0 ? (
          <>
            {filterBySearchValue.map((todo: any) => (
              <CardList todo={todo} key={todo.id} />
            ))}
          </>
        ) : (
          <Empty className='m-auto'/>
        )}
      </div>
    </div>
  );
}
