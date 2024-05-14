import { useState } from "react";
import { Input } from "../ui/input";


export default function SelectTime () {
    const [value, setValue] = useState<string>('10:00');
    const time = new Date()
    const hour = time.getHours()
    const minutes = time.getMinutes()
    const daytime = time.getUTCDay()
    
    return (
        <div className='flex'>
          {/* <select name="cars" id="hours">
            <option value="00">00</option>
          </select> */}
          <input type="number" id="hours"  min="00" max="24" className="appearance-none timeInput w-[30px] h-[30px] p-1"/>
          <Input type="number" id="minutes" min="00" max="59" className="appearance-none timeInput w-[30px] h-[30px] p-1"/>
        </div>
    )
}