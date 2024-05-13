import react, { useState } from 'react';
import TimePicker from 'react-time-picker';
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectValue,
} from "../ui/select";
import React from 'react';
import * as SelectPrimitive from "@radix-ui/react-select"
import { cn } from '@/lib/utils';
const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

export default function SelectTime () {
    const [value, setValue] = useState<string>('10:00');
    const time = new Date()
    const hour = time.getHours()
    const minutes = time.getMinutes()
    const daytime = time.getUTCDay()
    
    return (
        <div className='flex'>
          <Select onValueChange={(value) => {
            
          }}>
      <SelectTrigger className="w-[35px] h-[30px] focus-visible:ring-0 px-2">
        <SelectValue placeholder={hour} />
      </SelectTrigger>
      <SelectContent className='w-[35px]'>
        <SelectGroup className='w-[35px]'>
          <SelectLabel>{hour}</SelectLabel>
          <SelectItem value="00">00</SelectItem>
          <SelectItem value="01">01</SelectItem>
          <SelectItem value="02">02</SelectItem>
          <SelectItem value="03">03</SelectItem>
          <SelectItem value="04">04</SelectItem>
          <SelectItem value="05">05</SelectItem>
          <SelectItem value="06">06</SelectItem>
          <SelectItem value="07">07</SelectItem>
          <SelectItem value="08">08</SelectItem>
          <SelectItem value="09">09</SelectItem>
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="11">11</SelectItem>
          <SelectItem value="12">12</SelectItem>
          <SelectItem value="13">13</SelectItem>
          <SelectItem value="14">14</SelectItem>
          <SelectItem value="15">15</SelectItem>
          <SelectItem value="16">16</SelectItem>
          <SelectItem value="17">17</SelectItem>
          <SelectItem value="18">18</SelectItem>
          <SelectItem value="19">19</SelectItem>
          <SelectItem value="20">20</SelectItem>
          <SelectItem value="21">21</SelectItem>
          <SelectItem value="22">22</SelectItem>
          <SelectItem value="23">23</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>

    <Select onValueChange={(value) => {
            
          }}>
      <SelectTrigger className="w-[35px] h-[30px] focus-visible:ring-0 px-2">
        <SelectValue placeholder={hour} />
      </SelectTrigger>
      <SelectContent className='w-[35px]'>
        <SelectGroup className='w-[35px]'>
          <SelectLabel>{hour}</SelectLabel>
          <SelectItem value="00">00</SelectItem>
          <SelectItem value="01">01</SelectItem>
          <SelectItem value="02">02</SelectItem>
          <SelectItem value="03">03</SelectItem>
          <SelectItem value="04">04</SelectItem>
          <SelectItem value="05">05</SelectItem>
          <SelectItem value="06">06</SelectItem>
          <SelectItem value="07">07</SelectItem>
          <SelectItem value="08">08</SelectItem>
          <SelectItem value="09">09</SelectItem>
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="11">11</SelectItem>
          <SelectItem value="12">12</SelectItem>
          <SelectItem value="13">13</SelectItem>
          <SelectItem value="14">14</SelectItem>
          <SelectItem value="15">15</SelectItem>
          <SelectItem value="16">16</SelectItem>
          <SelectItem value="17">17</SelectItem>
          <SelectItem value="18">18</SelectItem>
          <SelectItem value="19">19</SelectItem>
          <SelectItem value="20">20</SelectItem>
          <SelectItem value="21">21</SelectItem>
          <SelectItem value="22">22</SelectItem>
          <SelectItem value="23">23</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
        </div>
    )
}