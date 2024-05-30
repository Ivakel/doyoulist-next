"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import SelectDays from "./selectDays";
import SelectPriority from "./selectPriority";
import ChooseTime from "./chooseTime";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { getCurrentTime } from "@/lib/utils";

type Props = {
}
export default function DailyForm({}: Props) {
  const {hour, minute} = getCurrentTime()
  const [priority, setPriority] = useState<string>("Low");
  const [days, setDays] = useState<Set<string>>(new Set())
  const [hours, setHours] = useState<String>(hour.toString())
  const [minutes, setMinutes] = useState<String>(minute.toString())
    
  const formSchema = z.object({
    name: z
      .string()
      .min(1, { message: "This field has to be filled." }),
    description: z.string(),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    console.log({priority, days, hours, minutes})

  }
  return (
    <>
    
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 xl:w-96"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl className="bg-[#F8FAFC]">
                  <Input
                    placeholder="Task Name"
                    {...field}
                    className="focus-visible:ring-0"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl className="bg-[#F8FAFC]">
                <Textarea className="focus-visible:ring-0" {...field} placeholder="Type your message here." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex w-[100px] mt-4 space-x-2">
            <SelectDays setDays={setDays} />
            <SelectPriority setPriority={setPriority} />
            <ChooseTime setHours={setHours} currentHour={hour.toString()} setMinutes={setMinutes} currentMinute={minute.toString()}/>
          </div>
          <Button type="submit">Add task</Button>
        </form>
      </Form>
    </>
    
  )
}



