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
import SelectTime from "./selectTime";
import SelectPriority from "./selectPriority";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { LoaderIcon } from "lucide-react";
import { axiosInstance } from "@/lib/axios";
import { ToastAction } from "../ui/toast";
import { useSession } from "next-auth/react";
import { useToast } from "../ui/use-toast";
import { getCurrentTime } from "@/lib/utils";
import { Calendar } from "../ui/calendar";

type Props = {};

export default function OnetimeTaskForm({}: Props) {
  const { data: session, status } = useSession();
  const { toast } = useToast();
  const { hour, minute } = getCurrentTime();
  const [priority, setPriority] = useState<"low" | "medium" | "high">("low");
  const [hours, setHours] = useState<string>(hour.toString());
  const [minutes, setMinutes] = useState<string>(minute.toString());
  const [isLoading, SetIsLoading] = useState(false);
  const [dueDate, setDueDate] = useState(new Date());

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
    if (status !== "authenticated") {
      toast({
        variant: "destructive",
        title: "Task not created",
        description: "Something went wrong",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      return;
    }

    SetIsLoading(true);
    const data = await axiosInstance.post("/api/add-task/onetime", {
      ...values,
      priority,
      dueDate,
      hours,
      minutes,
      user: session.user?.email,
    });
    SetIsLoading(false);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-3 md:w-96"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl className="">
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
              <FormControl className="">
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
          <Calendar
            mode="default"
            onDayClick={(newDate) => {
              setDueDate((currentDate) => newDate);
            }}
          />
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
        <Button
          className="mt-4 flex justify-center space-x-2"
          disabled={isLoading}
          type="submit"
        >
          {isLoading && <LoaderIcon className="spinner size-4" />}
          <h3 className={`${isLoading && "text-slate-700"}`}>Add task</h3>
        </Button>
      </form>
    </Form>
  );
}
