"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Header as Head } from "antd/es/layout/layout";
import { Button, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useDebounce } from "use-debounce";

import CreateTodoModal from "./modals/createTodoModal";

const Header = () => {
  const [toggleCreateTodoModal, setToggleCreateTodoModal] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [query] = useDebounce(searchValue, 500);
  const router = useRouter();

  const toggleModal = () => {
    setToggleCreateTodoModal((modal) => !modal);
  };

  useEffect(() => {
    if (!query) {
      router.push("/");
    } else {
      router.push(`/?search=${searchValue}`);
    }
  }, [query, router]);

  return (
    <Head>
      <div className="flex justify-between items-center ">
        <div className="w-[50px] h-[50px] ">
          <img
            src="https://img.freepik.com/free-psd/checklist-indicates-pending-completed-tasks_1419-3036.jpg?size=626&ext=jpg&ga=GA1.2.1233160252.1704279777&semt=sph"
            alt="TodoLogo"
            className="rounded-xl"
          />
        </div>
        <div className="">
          <Input
            placeholder="search..."
            size="large"
            className="w-[400px] mt-3 rounded-none"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <SearchOutlined className="p-[12px] pt-[13.5px] bg-white" />
        </div>
        <Button
          type="primary"
          className="bg-blue-500 "
          onClick={toggleModal}
        >
          Create
        </Button>
      </div>
      <CreateTodoModal onOpen={toggleCreateTodoModal} onClose={toggleModal} />
    </Head>
  );
};

export default Header;
