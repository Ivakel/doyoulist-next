"use client";

import { TaskDisplayContextProvider } from "@/context/taskDisplayContext";
import Provider from "@/components/Provider";
import HomePage from "./homePage";

export default function page() {
  return (
    <Provider>
      <TaskDisplayContextProvider>
        <HomePage />
      </TaskDisplayContextProvider>
    </Provider>
  );
}
