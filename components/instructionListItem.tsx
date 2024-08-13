import { InstructionType } from "@/context/taskDisplayContext"
import { Checkbox } from "./ui/checkbox"

type Props = {
    instruction: InstructionType
    key: number
}

export default function InstructionListItem({ key, instruction }: Props) {
    const handleClicked = async () => {}
    return (
        <li key={key} className="flex items-center space-y-4 align-middle">
            <Checkbox
                className="mr-4 size-5 rounded-full data-[state=checked]:bg-[#575293]"
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
