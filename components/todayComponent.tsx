"use client";
import Image from "next/image";
import CountCircle from "./ui/countCircle";
import DateIcon from "@/public/svg/date-box-icon.svg";
import DropDownArrow from "@/public/svg/arrow-down.svg";
import { useState } from "react";
import DateBox from "./dateBox";

export default function TodayComponent() {
  const [isopen, setIsOpen] = useState(false);
  const summery = ["laundry", "homework", "pancakes", "shopping"];
  return (
    <button
      onClick={() => setIsOpen((prev) => !prev)}
      className="flex hover:bg-[#eeeded] rounded-md p-2 transition-colors duration-300"
    >
      <DateBox />
      <div>
        <div className="list-none flex">
          <div className="p-1">
            <h1 className="font-semibold text-left transition-all duration-300">
              Today
            </h1>

            <h3 className="font-medium text-xs text-slate-500 ml-1 text-left">
              {summery.join(">")}
            </h3>
          </div>
          <CountCircle count={5} />
          <div className="mt-[15px] ml-5">
            <Image
              src={DropDownArrow}
              alt="dropdown arrow"
              width={20}
              height={20}
              className={
                isopen
                  ? "rotate-180 transition-all duration-300"
                  : "transition-all duration-300"
              }
            />
          </div>
        </div>
      </div>
    </button>
  );
}
