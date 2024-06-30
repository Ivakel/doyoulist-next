"use client";
import Image from "next/image";
import { Checkbox } from "./ui/checkbox";
import TimeIcon from "@/public/svg/time.svg";
import { axiosInstance } from "@/lib/axios";
import { OneTimeTaskType } from "@/lib/types";
type Props = {
  id: string;
  task: OneTimeTaskType;
};

const priorityColors = {
  high: "#DB4848",
  medium: "#F28A46",
  low: "#41AA60",
};

export default function OnetimeTask({ id, task }: Props) {
  // const {setTaskDisplay} = useContext(TaskDisplayContext);
  const handleSetTaskDisplay = () => {};
  const handleClicked = async () => {};
  const priorityColor = priorityColors[task.priority];
  return (
    <li className="group" key={id}>
      <button
        className="flex w-full items-center gap-4 rounded-md px-4 align-middle hover:cursor-pointer hover:bg-[#D9D9D9]"
        onClick={() => {}}
      >
        <Checkbox
          className="size-5 rounded-full data-[state=checked]:bg-[#575293]"
          id={id}
          checked={task.completed}
          onClick={() => {
            handleClicked();
          }}
        />
        <div className="flex w-full items-center justify-between align-middle">
          <div className="flex flex-col gap-0">
            <h3 className="text-sm font-medium">{task.name}</h3>
            <div className="flex items-center gap-1 align-middle">
              <Image
                src={TimeIcon}
                width={20}
                height={20}
                alt="time icon"
                priority
                className="size-3"
              />
              <h3 className="text-xs">{task.dueDate.toTimeString()}</h3>
            </div>
          </div>
          <span
            className={`right-0 z-10 flex size-3 justify-end rounded-full opacity-60 group-hover:opacity-100 bg-[${priorityColor}]`}
          ></span>
        </div>
      </button>
    </li>
  );
}
