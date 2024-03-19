import Image from "next/image";
import { Checkbox } from "./ui/checkbox";
import TimeIcon from "@/public/svg/time.svg";
import { TaskItem } from "@/lib/types";
import { axiosInstance } from "@/middleware/axios";
import { Dispatch, SetStateAction } from "react";
type Props = TaskItem & {
  setTriggerRefetch: Dispatch<SetStateAction<boolean>>;
};

export default function TaskListItem({
  dueDate,
  taskName,
  id,
  complete,
  setTriggerRefetch,
}: Props) {
  const handleClicked = () => {
    console.log("clicked");
    axiosInstance.post(`/api/tasks/today/${id}`, {}).then((data) => {});
    setTriggerRefetch((prev: boolean) => !prev);
  };
  return (
    <li className="flex align-middle items-center gap-4" key={id}>
      <Checkbox
        className="size-5 rounded-full data-[state=checked]:bg-[#575293]"
        id={id}
        checked={complete}
        onClick={() => handleClicked()}
      />
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
    </li>
  );
}
