import { InstructionType } from "@/context/TaskDisplayContext"
import { Checkbox } from "./ui/checkbox"

type Props = {
    instruction: InstructionType
    key: number
}

export default function InstructionListItem({ key, instruction }: Props) {
    const handleClicked = async () => {}
    return (
        <li key={key} className="flex align-middle items-center space-y-4">
            <Checkbox
                className="size-5 rounded-full data-[state=checked]:bg-[#575293] mr-4"
                id={`${key}`}
                key={key}
                checked={false}
                onClick={() => {
                    handleClicked()
                }}
            />
                
                {instruction.instruction}
        </li>
    )
}
