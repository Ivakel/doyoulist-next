import { useState } from 'react';
import TimePicker from 'react-time-picker';
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";

export default function SelectTime () {
    const [value, setValue] = useState<string>('10:00');
    
    return (
        <>
      <TimePicker className={"flex"} onChange={(value) => { 
        if (value) {
            setValue(value.toString())
        }
      }} value={value} />
    </>
    )
}