import { Checkbox } from "./ui/checkbox";
type Props = {
  task: string;
  time: string;
};

export default function TaskListItem() {
  return (
    <li>
      <Checkbox className="rounded-full" />
    </li>
  );
}
