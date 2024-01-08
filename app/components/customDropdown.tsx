"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { ArrowDownOutlined } from "@ant-design/icons";

const CustomDropDown = () => {
  const [isActiveDropDrown, setIsActiveDropDown] = useState(false);
  const router = useRouter();

  const toggleActiveDropDown = () => {
    setIsActiveDropDown((item) => !item);
  };
  return (
    <div className="relative pt-2 pb-5">
      <div
        className="w-[60px] flex items-center justify-end text-sm font-medium py-[4px] px-[8px] hover:bg-black/5 cursor-pointer rounded-sm ml-3 absolute right-4"
        onClick={toggleActiveDropDown}
      >
        <span>Sort</span>
        <ArrowDownOutlined
          className={`w-[14px] h-[14px] mt-[2px] ${
            isActiveDropDrown
              ? "rotate-180 transition duration-200 ease-in"
              : "rotate-0 transition duration-200 ease-out"
          }`}
        />
      </div>

      {isActiveDropDrown ? (
        <div className="w-[160px] border-[1px] border-[#DCDCDC] bg-white rounded-md absolute right-[2px] mt-[30px] ">
          <div className="text-xs text-black/0.60 ml-[4px] mt-[4px]">
            sort by status:
          </div>
          <div
            className="w-full flex items-center mt-[4px] hover:bg-black/10 pl-[4px] focus:outline-none text-xs font-normal rounded-sm cursor-pointer transition duration-200 pr-[4px] mb-[4px]"
            onClick={() => {
              router.push("/?filterByStatus=All");
            }}
          >
            <div className="flex-1">All</div>
          </div>
          <div
            className="w-full flex items-center mt-[4px] hover:bg-black/10 pl-[4px] focus:outline-none text-xs font-normal rounded-sm cursor-pointer transition duration-200 pr-[4px] mb-[4px]"
            onClick={() => {
              router.push("/?filterByStatus=Done");
            }}
          >
            <div className="flex-1">Done</div>
          </div>
          <div
            className="w-full flex items-center mt-[4px] hover:bg-black/10 pl-[4px] focus:outline-none text-xs font-normal rounded-sm cursor-pointer transition duration-200 pr-[4px] mb-[4px]"
            onClick={() => {
              router.push("/?filterByStatus=Waiting for execution");
            }}
          >
            <div className="flex-1">Wating for execution</div>
          </div>
          <div
            className="w-full flex items-center hover:bg-black/10 pl-[4px] focus:outline-none text-xs font-normal rounded-sm cursor-pointer transition duration-200 pr-[4px] mb-[4px]"
            onClick={() => {
              router.push("/?filterByStatus=In Progress");
            }}
          >
            <div className="flex-1">In progress</div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CustomDropDown;
