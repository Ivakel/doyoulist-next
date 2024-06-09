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
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { getCurrentTime } from "@/lib/utils";
import SelectTime from "./selectTime";
import { MultiSelect } from "../multiSelect";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/middleware/axios";
import { DailyFormTypes } from "@/lib/types";

type Props = {};
export default function DailyForm({}: Props) {
  const { toast } = useToast();
  const { hour, minute } = getCurrentTime();
  const [priority, setPriority] = useState<string>("Low");
  const [days, setDays] = useState<string[]>([]);
  const [hours, setHours] = useState<String>(hour.toString());
  const [minutes, setMinutes] = useState<String>(minute.toString());

  const formSchema = z.object({
    name: z.string().min(1, { message: "This field has to be filled." }),
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
    if (days.length < 1) {
      toast({
        variant: "destructive",
        title: "Task form not complete",
        description: "No days were selected",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      return;
    }
    const data = await axiosInstance.post("/api/add-task/daily", {
      ...values,
      priority,
      days,
      hours,
      minutes,
    });
    console.log(data);
  }
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-2 xl:w-96"
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
                  <Textarea
                    className="focus-visible:ring-0"
                    {...field}
                    placeholder="Type your message here."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mt-4 flex w-[100px] space-x-2">
            <SelectDays days={days} setDays={setDays} />
            <SelectPriority setPriority={setPriority} />
            <SelectTime
              setHours={setHours}
              currentHour={hour >= 10 ? hour.toString() : `0${hour.toString()}`}
              setMinutes={setMinutes}
              currentMinute={
                minute >= 10 ? minute.toString() : `0${minute.toString()}`
              }
            />
          </div>
          <Button className="flex justify-center" type="submit">
            Add task
          </Button>
        </form>
      </Form>
    </>
  );
}
