import { Checkbox } from "../ui/checkbox";

export default function SelectDays () {
    const items = ["Today", "Tomorrow", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    return (
        <ul className="">
            {items.map((item, index) => {
                return (<li className="flex items-center gap-2">
                <Checkbox id={`${item}-${index}`}/>
                <h3 className="text-lg">{item}</h3>
            </li>)
            })}
        </ul>
    )
}