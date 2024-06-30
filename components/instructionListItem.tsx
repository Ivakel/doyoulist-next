import { InstructionType } from "@/context/TaskDisplayContext";
import { Checkbox } from "./ui/checkbox";

type Props = {
  instruction: InstructionType;
  key: number;
};

export default function InstructionListItem({ key, instruction }: Props) {
  const handleClicked = async () => {};
  return (
    <li key={key}>
      <Checkbox
        className="size-5 rounded-full data-[state=checked]:bg-[#575293]"
        id={key.toString()}
        key={key}
        checked={instruction.completed}
        onClick={() => {
          handleClicked();
        }}
      />
      <div>
        <span>{instruction.title}:</span>
        <span>{instruction.sentence}</span>
      </div>
    </li>
  );
}
