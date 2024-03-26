import Image from "next/image";
import { Checkbox } from "./ui/checkbox";
import TimeIcon from "@/public/svg/time.svg";
import {  WeeklyTaskItem } from "@/lib/types";
import { axiosInstance } from "@/middleware/axios";
import { Dispatch, SetStateAction } from "react";
type Props =  {
  setTriggerRefetch: Dispatch<SetStateAction<boolean>>,
  dueDate: string,
  priority: "high" | "medium" | "low",
  id: string,
  taskName: string,
  complete: boolean,
};

export default function WeeklyTaskList({
  dueDate,
  taskName,
  id,
  complete,
 
  priority,
  setTriggerRefetch,
}: Props) {
  const handleClicked = async () => {
    console.log(priority);
    await axiosInstance.post(`/api/tasks/weekly/${id}`, {}).then((data) => {
      setTriggerRefetch((prev: boolean) => !prev);
    });
  };
  return (
    <li
      className="flex align-middle items-center gap-4 px-4 rounded-md hover:bg-[#D9D9D9] hover:cursor-pointer"
      key={id}
    >
      <Checkbox
        className="size-5 rounded-full data-[state=checked]:bg-[#575293]"
        id={id}
        checked={complete}
        onClick={() => {
            console.log("what");
            handleClicked();
        }
        }
      />
      <div className="flex gap-0">
        <div className="flex flex-col gap-0">
        <h3 className="text-sm font-medium">{taskName}</h3>
        <div className="flex gap-1 align-middle items-center">
          <Image
            src={TimeIcon}
            width={20}
            height={20}
            alt="time icon"
            priority
            className="size-3"
          />
          <h3 className="text-xs">{dueDate}</h3>
        </div>
        </div>
        <span className={`size-4 rounded-full bg:[#${priority === "high"? "DB4848" : priority === "low"? "41AA60": "F28A46"}]`}></span>
      </div>
    </li>
  );
}
