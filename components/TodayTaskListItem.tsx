import { Checkbox } from "./ui/checkbox";
import { TodayTaskItem } from "@/lib/types";
import { Clock } from "lucide-react";
type Props = {
  task: TodayTaskItem;
  id: number;
};

export default function TodayTaskListItem({ task, id }: Readonly<Props>) {
  const handleClicked = async () => {};
  console.log(typeof task.dueTime);
  return (
    <button
      className="flex items-center gap-4 rounded-md px-4 align-middle hover:cursor-pointer hover:bg-[#D9D9D9]"
      key={id}
    >
      <Checkbox
        className="size-5 rounded-full data-[state=checked]:bg-[#575293]"
        id={`${id}`}
        checked={task.completed}
        onClick={() => {
          handleClicked();
        }}
      />
      <div className="flex flex-col gap-0">
        <h3 className="text-sm font-medium">{task.name}</h3>
        <div className="flex items-center gap-1 align-middle">
          <Clock className="size-4" />
          <h3 className="text-xs">{"dferf"}</h3>
        </div>
      </div>
    </button>
  );
}
