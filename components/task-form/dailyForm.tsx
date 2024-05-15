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
import SelectTaskMode from "../selectTaskMode";
import SelectDays from "./selectDays";
import SelectTime from "./selectTime";
import SelectPriority from "./selectPriority";
import ChooseTime from "./chooseTime";
import { Textarea } from "../ui/textarea";

type Props = {
    onSubmit: SubmitHandler<{ name: string; description: string; }>
}
export default function DailyForm({onSubmit}: Props) {
    const [priority, setPriority] = useState<string>("low");

  const formSchema = z.object({
    name: z
      .string()
      .min(1, { message: "This field has to be filled." })
      .email("This is not a valid email."),
    description: z.string(),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });
  return (
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
          <div className="flex w-[100px] mt-4">
            <SelectDays/>
            <SelectPriority setPriority={setPriority}/>
            <ChooseTime/>
          </div>
        </form>
      </Form>
  )
}
