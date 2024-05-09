"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import SelectTaskMode from "../selectTaskMode";

export default function dailyTaskFormContainer() {
  const [taskName, setTaskName] = useState<string>("New Task");
  const [taskMode, setTaskMode] = useState<string>("New Task");
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

  async function onSubmit(values: z.infer<typeof formSchema>) {}

  return (
    <aside>
      <div>
        <h2>{taskName}</h2>
        <SelectTaskMode setTaskMode={setTaskMode} />
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 xl:w-96"
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
                  <Input
                    placeholder="Description"
                    {...field}
                    className="focus-visible:ring-0"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </aside>
  );
}
